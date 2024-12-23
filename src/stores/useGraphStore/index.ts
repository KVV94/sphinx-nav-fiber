import { forceCenter, forceCollide, forceLink, forceManyBody, forceRadial, forceSimulation, forceY } from 'd3-force-3d'
import { create } from 'zustand'
import { ForceSimulation } from '~/transformers/forceSimulation'
import { GraphData, Link, Node, NodeExtended } from '~/types'
import { useDataStore } from '../useDataStore'

const simulationTicks = 100

export type GraphStyle = 'sphere' | 'force' | 'split' | 'earth'

interface SimulationHelpers {
  addNodesAndLinks: (nodes: Node[], links: Link[], replace: boolean) => void
  setForces: () => void
  addRadialForce: () => void
  addDefaultForce: () => void
  addSplitForce: () => void
  simulationRestart: () => void
  getLinks: () => Link<NodeExtended>[]
}

const resetPosition = {
  fx: null,
  fy: null,
  fz: null,
  x: null,
  y: null,
  z: null,
  vx: null,
  vy: null,
  vz: null,
}

const defaultSimulationHelpers: SimulationHelpers = {
  addNodesAndLinks: () => {
    /* do nothing */
  },
  setForces: () => {
    /* do nothing */
  },
  addRadialForce: () => {
    /* do nothing */
  },
  addDefaultForce: () => {
    /* do nothing */
  },

  addSplitForce: () => {
    /* do nothing */
  },

  simulationRestart: () => {
    /* do nothing */
  },
  getLinks: () => [],
  /* do nothing */
}

const runSimulationPhase = (simulation: ForceSimulation) => {
  simulation.stop().alpha(1)

  for (let i = 0; i < simulationTicks; i += 1) {
    simulation.tick()
  }
}

export const graphStyles: GraphStyle[] = ['sphere', 'force', 'split', 'earth']

export type GraphStore = {
  graphRadius: number
  data: { nodes: NodeExtended[]; links: Link[] } | null
  selectionGraphData: GraphData
  graphStyle: GraphStyle
  hoveredNode: NodeExtended | null
  selectedNode: NodeExtended | null
  cameraFocusTrigger: boolean
  nearbyNodeIds: string[]
  showSelectionGraph: boolean
  disableCameraRotation: boolean
  scrollEventsDisabled: boolean
  simulation: ForceSimulation | null
  simulationHelpers: SimulationHelpers
  isHovering: boolean
  activeEdge: Link | null

  setDisableCameraRotation: (rotation: boolean) => void
  setScrollEventsDisabled: (rotation: boolean) => void
  setData: (data: GraphData) => void
  setGraphStyle: (graphStyle: GraphStyle) => void
  setGraphRadius: (graphRadius: number) => void
  setHoveredNode: (hoveredNode: NodeExtended | null) => void
  setSelectedNode: (selectedNode: NodeExtended | null) => void
  setActiveEdge: (edge: Link | null) => void
  setCameraFocusTrigger: (_: boolean) => void
  setNearbyNodeIds: (_: string[]) => void
  setShowSelectionGraph: (_: boolean) => void
  setSelectionData: (data: GraphData) => void
  simulationCreate: (nodes: Node[], links: Link[]) => void
  setIsHovering: (isHovering: boolean) => void
}

const defaultData: Omit<
  GraphStore,
  | 'setData'
  | 'setCameraAnimation'
  | 'setScrollEventsDisabled'
  | 'setDisableCameraRotation'
  | 'setHoveredNode'
  | 'setSelectedNode'
  | 'setActiveEdge'
  | 'setCameraFocusTrigger'
  | 'setGraphRadius'
  | 'setGraphStyle'
  | 'setNearbyNodeIds'
  | 'setShowSelectionGraph'
  | 'setSelectionData'
  | 'setHideNodeDetails'
  | 'simulationCreate'
  | 'setIsHovering'
> = {
  data: null,
  simulation: null,
  selectionGraphData: { nodes: [], links: [] },
  disableCameraRotation: false,
  scrollEventsDisabled: false,
  graphRadius: 1500, // calculated from initial load
  graphStyle: (localStorage.getItem('graphStyle') as GraphStyle) || 'sphere',
  hoveredNode: null,
  selectedNode: null,
  activeEdge: null,
  cameraFocusTrigger: false,
  nearbyNodeIds: [],
  showSelectionGraph: false,
  simulationHelpers: defaultSimulationHelpers,
  isHovering: false,
}

export const useGraphStore = create<GraphStore>()((set, get) => ({
  ...defaultData,
  setData: (data) => {
    set({ data })
  },
  setSelectionData: (selectionGraphData) => set({ selectionGraphData }),
  setScrollEventsDisabled: (scrollEventsDisabled) => set({ scrollEventsDisabled }),
  setDisableCameraRotation: (rotation) => set({ disableCameraRotation: rotation }),
  setIsHovering: (isHovering) => set({ isHovering }),
  setGraphRadius: (graphRadius) => set({ graphRadius }),
  setGraphStyle: (graphStyle) => set({ graphStyle }),
  setHoveredNode: (hoveredNode) => {
    set({ hoveredNode })
  },
  setActiveEdge: (activeEdge) => {
    set({ activeEdge })
  },
  setSelectedNode: (selectedNode) => {
    const { selectedNode: stateSelectedNode, simulation } = get()

    if (stateSelectedNode?.ref_id !== selectedNode?.ref_id) {
      const selectedNodeWithCoordinates =
        simulation.nodes().find((i: NodeExtended) => i.ref_id === selectedNode?.ref_id) || null

      set({
        hoveredNode: null,
        selectedNode: selectedNodeWithCoordinates,
        disableCameraRotation: true,
      })
    }
  },
  setCameraFocusTrigger: (cameraFocusTrigger) => set({ cameraFocusTrigger }),
  setNearbyNodeIds: (nearbyNodeIds) => {
    const stateNearbyNodeIds = get().nearbyNodeIds

    if (nearbyNodeIds.length !== stateNearbyNodeIds.length || nearbyNodeIds[0] !== stateNearbyNodeIds[0]) {
      set({ nearbyNodeIds })
    }
  },
  setShowSelectionGraph: (showSelectionGraph) => set({ showSelectionGraph }),
  simulationHelpers: {
    addNodesAndLinks: (newNodes, newLinks, replace) => {
      const structuredNodes = structuredClone(newNodes)
      const structuredLinks = structuredClone(newLinks)

      const { simulation, simulationHelpers } = get()

      simulation.stop()

      const nodes = replace ? [] : simulation.nodes().map((n: NodeExtended) => ({ ...n, fx: n.x, fy: n.y, fz: n.z }))
      const links = replace ? [] : simulation.force('link').links()

      nodes.push(...structuredNodes)
      links.push(...structuredLinks)

      try {
        simulation.nodes(nodes)

        const filteredLinks = links.filter((link: Link<NodeExtended | string>) => {
          const { target, source } = link
          const simulationNodes = simulation.nodes()

          // Log the target and source ref_id for debugging
          const targetRefId = (target as NodeExtended)?.ref_id || target
          const sourceRefId = (source as NodeExtended)?.ref_id || source

          return (
            simulationNodes.some((n: NodeExtended) => n.ref_id === targetRefId) &&
            simulationNodes.some((n: NodeExtended) => n.ref_id === sourceRefId)
          )
        })

        simulation.force('link').links([]).links(filteredLinks)

        simulationHelpers.simulationRestart()
      } catch (error) {
        console.error(error)
        // eslint-disable-next-line no-debugger
      }

      // Add simulation node to reference (so that we can access reference on tick to update position)
    },

    addRadialForce: () => {
      const { simulation } = get()

      simulation
        .nodes(simulation.nodes().map((n: Node) => ({ ...n, ...resetPosition })))
        .force('y', null)
        .force('radial', forceRadial(200, 0, 0, 0).strength(0.1))
        .force('center', forceCenter().strength(1))
        .force(
          'collide',
          forceCollide()
            .radius(() => 250)
            .strength(1)
            .iterations(1),
        )
    },

    addDefaultForce: () => {
      const { simulation } = get()

      simulation
        .nodes(simulation.nodes().map((n: Node) => ({ ...n, ...resetPosition })))
        .force('y', null)
        .force('charge', forceManyBody().strength(-20))
        .force('center', forceCenter().strength(1))
        .force(
          'collide',
          forceCollide()
            .radius(() => 250)
            .strength(1)
            .iterations(1),
        )
    },

    addSplitForce: () => {
      const { simulation } = get()
      const { nodeTypes } = useDataStore.getState()

      simulation
        .stop()
        .nodes(simulation.nodes().map((n: Node) => ({ ...n, ...resetPosition })))
        .force('radial', forceRadial(200, 0, 0, 0).strength(0.1))
        .force(
          'collide',
          forceCollide()
            .radius(() => 250)
            .strength(1)
            .iterations(1),
        )
        .force(
          'y',
          forceY()
            .y((node: NodeExtended) => {
              const index = nodeTypes.indexOf(node.node_type)
              const yOffset = Math.floor(index / 2) * 400

              return index % 2 === 0 ? yOffset : -yOffset
            })
            .strength(10),
        )
    },

    getLinks: () => {
      const { simulation } = get()

      return simulation ? simulation.force('link').links() : []
    },

    setForces: () => {
      const { graphStyle, simulationHelpers } = get()

      if (graphStyle === 'split') {
        simulationHelpers.addSplitForce()
      }

      if (graphStyle === 'sphere') {
        simulationHelpers.addRadialForce()
      }

      if (graphStyle === 'force') {
        simulationHelpers.addDefaultForce()
      }

      simulationHelpers.simulationRestart()
    },

    simulationRestart: () => {
      const { simulation } = get()

      if (false) {
        runSimulationPhase(simulation)
      }

      simulation.alpha(1).restart()
    },
  },
  simulationCreate: (nodes, links) => {
    const structuredNodes = structuredClone(nodes)
    const structuredLinks = structuredClone(links)

    const simulation = forceSimulation([])
      .numDimensions(3)
      .stop()
      .nodes(structuredNodes)
      .force(
        'link',
        forceLink()
          .links(structuredLinks)
          .id((d: Node) => d.ref_id),
      )

    set({ simulation })
  },
}))

export const useSelectedNode = () => useGraphStore((s) => s.selectedNode)
export const useHoveredNode = () => useGraphStore((s) => s.hoveredNode)
export const useUpdateSelectedNode = () => useGraphStore((s) => s.setSelectedNode)

export const useSelectedNodeRelativeIds = () => {
  const selectedNode = useGraphStore((s) => s.selectedNode)

  if (!selectedNode) {
    return []
  }

  const { dataInitial } = useDataStore.getState()

  const links = dataInitial?.links || []

  const relativeIds = links.reduce<string[]>((acc, curr) => {
    if (curr.source === selectedNode?.ref_id) {
      acc.push(curr.target)
    }

    if (curr.target === selectedNode?.ref_id) {
      acc.push(curr.source)
    }

    return acc
  }, [])

  return relativeIds
}
