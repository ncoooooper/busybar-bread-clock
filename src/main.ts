import {desk,duration} from "@shared/desk";

const names=["Mix / autolyse","Fold one","Fold two","Fold three","Bulk rise","Final proof"];
const initial=()=>({step:0,due:0,lengths:[30,30,30,30,90,60],overview:false});
desk({name:"Bread Clock",accent:"#ECA64C",motion:{enabled:false},initial,render:(s,now)=>{
 const done=s.step>=names.length,remain=s.due?Math.max(0,s.due-now):(s.lengths[s.step]||0)*60000;
 const total=remain+s.lengths.slice(s.step+1).reduce((a,b)=>a+b,0)*60000;
 return {title:done?"Bread clock":s.overview?"Whole loaf":names[s.step],value:done?"Bake now":s.overview?Math.ceil(total/60000)+" min":s.due?duration(remain):"Start loaf",
 lines:[done?"All stages complete":names[s.step],"Stage "+Math.min(6,s.step+1)+" of 6","Loaf remaining "+Math.ceil(total/60000)+" min","Click: next timed stage","Wheel: adjust duration","Start: remaining / hold: new"],progress:s.step/6};},
action:(s,k,now)=>{if(k==="hold-start"){Object.assign(s,initial());return;}
 if(k==="start")s.overview=!s.overview;if(s.step>=6)return;
 if(k==="ok"){if(s.due)s.step++;s.due=s.step<6?now+s.lengths[s.step]*60000:0;}
 if(k==="up"||k==="down"){const old=s.lengths[s.step];s.lengths[s.step]=Math.min(360,Math.max(5,old+(k==="up"?5:-5)));if(s.due)s.due+=(s.lengths[s.step]-old)*60000;}
},ticking:s=>s.due>0&&s.step<6});
