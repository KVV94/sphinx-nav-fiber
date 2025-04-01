import{al as z,c3 as M,c4 as B,c5 as L,s as m,g as p,T as U,F as d,B as D,j as t,az as O,r as f,a as P,b3 as V,b4 as N,p as R,l as A,n as K,b1 as W}from"./index-ec7f32c8.js";import{i as v}from"./index-a7d5f584.js";import{A as q}from"./index-b28b454b.js";import{F as H}from"./FormControlLabel-5cfc0cbf.js";import{S as J}from"./Switch-44e36ddc.js";import{C as Q}from"./ClipLoader-2bb06285.js";const G="https://community.sphinx.chat",X=async e=>await z.post("/bounty",JSON.stringify(e)),Y=async e=>await M(`${G}/person/${e}`,{headers:{"Content-Type":"application/json"},method:"GET"}),Z=async e=>await M(`${G}/workspaces/user/${e}`,{headers:{"Content-Type":"application/json"},method:"GET"});async function ee(){try{const e=Math.floor(Date.now()/1e3),o=B.Buffer.from(e.toString(16),"hex"),r=B.Buffer.from(o).toString("base64"),c=await L.signMessage(r),s=te(c.signature),g=B.Buffer.concat([o,s],s.length+o.length);return oe(g)}catch(e){return console.log("error from signing more message: ",e),""}}function te(e){const o=e.replace(/_/g,"/").replace(/-/g,"+"),r=o.padEnd(o.length+(4-o.length%4)%4,"=");return B.Buffer.from(r,"base64")}function oe(e){let o="";const r=e.byteLength;for(let s=0;s<r;s+=1)o+=String.fromCharCode(e[s]);return btoa(o).replace(/\//g,"_").replace(/\+/g,"-").replace(/=+$/,"")}const I=/^[0-9]+$/,ne=e=>{const o=e.trim();return!!(o&&I.test(o))},se=({errMessage:e,handleClose:o,loading:r})=>{const{setValue:c,watch:s}=O(),[g,a]=f.useState([]),{pubKey:b}=P(),[y,x]=f.useState(!1),[i,S]=f.useState(!1);f.useEffect(()=>{async function n(){try{x(!0);const l=await Y(b);if(!l.id){a([{label:"SecondBrain",value:"SecondBrain"}]);return}const u=await Z(l.id);if(u.length>0){const $=[];for(let E=0;E<u.length;E+=1){const F=u[E];$.push({label:F.name,value:F.uuid})}a($)}}catch(l){console.error("Error from get user details: ",l)}finally{x(!1)}}n()},[b]);const w=s("budget",""),j=s("nodeType",""),k=n=>{const l=(n==null?void 0:n.label)||"SecondBrain",u=(n==null?void 0:n.value)||"ck9drb84nncjnaefo090";c("nodeType",l,{shouldValidate:!0}),c("workspaceUuid",u)},T=()=>{let n=!1;S(l=>{const u=!l;return n=u,u}),c("publicBounty",n)},C=ne(w)&&!!j,h=n=>{n.key===" "&&n.preventDefault()};return t.jsxs(d,{children:[t.jsx(d,{align:"center",direction:"row",justify:"space-between",mb:18,children:t.jsx(re,{children:"Create Bounty"})}),t.jsxs(d,{mb:20,children:[t.jsx(_,{children:"Select Workspace"}),t.jsx(q,{autoFocus:!0,isLoading:y,onSelect:k,options:g})]}),t.jsxs(d,{mb:20,children:[t.jsx(_,{children:"Set Budget"}),t.jsx(V,{id:"budget",name:"budget",onKeyDown:h,placeholder:"Enter budget",rules:{...N,pattern:{value:I,message:"Please enter a valid number"}},value:w})]}),t.jsx(le,{control:t.jsx(ue,{checked:i,onChange:()=>T()}),label:t.jsx(_,{children:"Public"}),labelPlacement:"start"}),t.jsxs(d,{direction:"row",children:[t.jsx(d,{grow:1,children:t.jsx(ce,{color:"secondary",onClick:()=>o(),size:"large",variant:"contained",children:"Cancel"})}),t.jsx(d,{grow:1,ml:20,children:t.jsx(D,{color:"secondary",disabled:!C||r,size:"large",startIcon:r&&t.jsx(ie,{children:t.jsx(Q,{color:p.lightGray,size:12})}),type:"submit",variant:"contained",children:"Confirm"})})]}),e&&t.jsx(ae,{children:e})]})},_=m(U)`
  font-size: 14px;
  font-weight: 600;
  font-family: 'Barlow';
  margin-bottom: 20px;
`,re=m(U)`
  font-size: 18px;
  font-weight: 600;
  font-family: 'Barlow';
  margin-bottom: 6px;
`,ae=m(d)`
  font-size: 13px;
  font-family: Barlow;
  color: #ff8f80;
  line-height: 0.2px;
  margin-top: 12px;
  padding-top: 20px;
`,ie=m.span`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  margin-top: 2px;

  svg {
    width: 16px;
    height: 16px;
  }
`,ce=m(D)`
  && {
    background: ${p.white};
    color: ${p.BG2};

    &:active,
    &:hover,
    &:focus {
      background: ${p.TOPIC};
      color: ${p.BG2};
    }
  }
`,le=m(H)`
  justify-content: start;
  align-items: center;
  margin-left: 2px !important;
  margin-bottom: 8px;
`,ue=m(e=>t.jsx(J,{...e}))`
  &.MuiSwitch-root {
    width: 58px;
    height: 42px;
  }
  & .MuiSwitch-switchBase {
    margin-top: 4px;
    &.Mui-checked {
      color: ${p.white};
      & + .MuiSwitch-track {
        background-color: ${p.primaryBlueBorder};
        opacity: 1;
      }
    }
  }
  & .MuiSwitch-thumb {
    width: 16px;
    height: 16px;
  }
  & .MuiSwitch-track {
    border-radius: 10px;
    background-color: ${p.BG2};
    opacity: 1;
  }
`,be=({setBounty:e,cancelBounty:o,loading:r})=>{const[c,s]=f.useState(""),{close:g}=R("createBounty"),a=v(),{pubKey:b}=P(),y=A({mode:"onChange"}),{handleSubmit:x,setValue:i}=y,S=()=>{i("budget",""),i("nodeType",""),i("workspaceUuid",""),i("publicBounty",!1),o?o():g()},w=async j=>{const{budget:k,workspaceUuid:T,publicBounty:C}=j;try{const h=await ee(),n={type:"code_generation",amount:Number(k),workspace_uuid:T||"ck9drb84nncjnaefo090",ref_id:a==null?void 0:a.ref_id,node_data:(a==null?void 0:a.properties)||{},jwt_token:h,pub_key:b,public_bounty:C||!1};e?e(n):(await X(n),W("Bounty Created"))}catch(h){s(h)}finally{i("budget",""),i("nodeType",""),i("workspaceUuid",""),i("publicBounty",!1),g()}};return t.jsx(K,{...y,children:t.jsx("form",{id:"create-bounty-form",onSubmit:x(w),children:t.jsx(se,{errMessage:c,handleClose:S,loading:r})})})};export{be as B};
