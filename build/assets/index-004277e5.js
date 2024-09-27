import{aa as w,o as y,D as h,F as r,j as e,aW as S,r as C,Q as g,z as T}from"./index-18ac631e.js";import{h as k,B as x,i as b,F as D}from"./index-ea7b1d73.js";import{B as E}from"./index-25f202a8.js";import{S as F}from"./index-c7831d16.js";import{A as _}from"./index-e590d761.js";import{T as z}from"./index-fccfe2f8.js";import"./index.esm-7f7ba294.js";import"./Stack-8862c2bc.js";import"./useSlotProps-d14910ce.js";import"./Popover-74873530.js";import"./createSvgIcon-2d98ede6.js";import"./TextareaAutosize-60403bb2.js";import"./InfoIcon-2a894cf1.js";const V=async o=>await w.post("/bounty",JSON.stringify(o)),j=/^[0-9]+$/,v=o=>{const n=o.trim();return!!(n&&j.test(n))},M=({errMessage:o,handleClose:n})=>{const{setValue:i,watch:t}=k(),a=t("budget",""),l=t("nodeType",""),c=s=>{const p=(s==null?void 0:s.label)||"SecondBrain";i("nodeType",p,{shouldValidate:!0})},d=[{label:"SecondBrain",value:"SecondBrain"}],u=v(a)&&!!l,m=s=>{s.key===" "&&s.preventDefault()};return e.jsxs(r,{children:[e.jsx(r,{align:"center",direction:"row",justify:"space-between",mb:18,children:e.jsx(A,{children:"Create Bounty"})}),e.jsxs(r,{mb:20,children:[e.jsx(f,{children:"Select Workspace"}),e.jsx(_,{autoFocus:!0,onSelect:c,options:d})]}),e.jsxs(r,{mb:20,children:[e.jsx(f,{children:"Set Budget"}),e.jsx(z,{id:"budget",name:"budget",onKeyDown:m,placeholder:"Enter budget",rules:{...S,pattern:{value:j,message:"Please enter a valid number"}},value:a})]}),e.jsxs(r,{direction:"row",children:[e.jsx(r,{grow:1,children:e.jsx(x,{color:"secondary",onClick:()=>n(),size:"large",variant:"contained",children:"Cancel"})}),e.jsx(r,{grow:1,ml:20,children:e.jsx(x,{color:"secondary",disabled:!u,size:"large",type:"submit",variant:"contained",children:"Confirm"})})]}),o&&e.jsx(K,{children:o})]})},f=y(h)`
  font-size: 14px;
  font-weight: 600;
  font-family: 'Barlow';
  margin-bottom: 6px;
`,A=y(h)`
  font-size: 18px;
  font-weight: 600;
  font-family: 'Barlow';
  margin-bottom: 6px;
`,K=y(r)`
  font-size: 13px;
  font-family: Barlow;
  color: #ff8f80;
  line-height: 0.2px;
  margin-top: 12px;
  padding-top: 20px;
`,N=()=>{const[o,n]=C.useState(""),{close:i}=g("createBounty"),t=T(),a=b({mode:"onChange"}),{handleSubmit:l,setValue:c}=a,d=()=>{c("budget",""),c("nodeType",""),i()},u=async m=>{const{budget:s}=m,p={type:"code_generation",amount:Number(s),workspace_uuid:"ck9drb84nncjnaefo090",jwt_token:"abced-12345",ref_id:t==null?void 0:t.ref_id,node_data:(t==null?void 0:t.properties)||{}};try{await V(p),F("Bounty Created")}catch(B){n(B)}finally{c("budget",""),c("nodeType",""),d()}};return e.jsx(D,{...a,children:e.jsx("form",{id:"create-bounty-form",onSubmit:l(u),children:e.jsx(M,{errMessage:o,handleClose:d})})})},X=()=>{const{close:o}=g("createBounty"),n=b({mode:"onChange"}),{setValue:i}=n,t=()=>{i("budget",""),i("nodeType",""),o()},a="small";return e.jsx(E,{id:"createBounty",kind:a,onClose:t,preventOutsideClose:!0,children:e.jsx(N,{})})};export{X as CreateBountyModal};