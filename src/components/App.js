import React, { useState, useContext, createContext, useReducer } from 'react';
import { Trash2, Plus, User, GraduationCap, Code, FolderOpen, Globe, Eye, ArrowLeft, ArrowRight, Save } from 'lucide-react';

// ---------------- ACTION TYPES ----------------
const UPDATE_PROFILE = 'UPDATE_PROFILE';
const ADD_EDUCATION = 'ADD_EDUCATION';
const UPDATE_EDUCATION = 'UPDATE_EDUCATION';
const DELETE_EDUCATION = 'DELETE_EDUCATION';
const ADD_SKILL = 'ADD_SKILL';
const DELETE_SKILL = 'DELETE_SKILL';
const ADD_PROJECT = 'ADD_PROJECT';
const UPDATE_PROJECT = 'UPDATE_PROJECT';
const DELETE_PROJECT = 'DELETE_PROJECT';
const ADD_SOCIAL = 'ADD_SOCIAL';
const DELETE_SOCIAL = 'DELETE_SOCIAL';
const SET_CURRENT_PAGE = 'SET_CURRENT_PAGE';

// ---------------- INITIAL STATE ----------------
const initialState = {
  currentPage: 1,
  profile: { fname: '', lname: '', phone: '', address: '', url: '' },
  education: [],
  skills: [],
  projects: [],
  socialMedia: []
};

// ---------------- REDUCER ----------------
const resumeReducer = (state, action) => {
  switch (action.type) {
    case UPDATE_PROFILE:
      return { ...state, profile: { ...state.profile, ...action.payload } };
    case ADD_EDUCATION:
      return { ...state, education: [...state.education, { courseName: '', completionYear: '', college: '', percentage: '' }] };
    case UPDATE_EDUCATION:
      const updatedEdu = [...state.education];
      updatedEdu[action.payload.index] = action.payload.education;
      return { ...state, education: updatedEdu };
    case DELETE_EDUCATION:
      return { ...state, education: state.education.filter((_, i) => i !== action.payload) };
    case ADD_SKILL:
      return { ...state, skills: [...state.skills, action.payload] };
    case DELETE_SKILL:
      return { ...state, skills: state.skills.filter((_, i) => i !== action.payload) };
    case ADD_PROJECT:
      return { ...state, projects: [...state.projects, { projectName: '', techStack: '', description: '' }] };
    case UPDATE_PROJECT:
      const updatedProj = [...state.projects];
      updatedProj[action.payload.index] = action.payload.project;
      return { ...state, projects: updatedProj };
    case DELETE_PROJECT:
      return { ...state, projects: state.projects.filter((_, i) => i !== action.payload) };
    case ADD_SOCIAL:
      return { ...state, socialMedia: [...state.socialMedia, action.payload] };
    case DELETE_SOCIAL:
      return { ...state, socialMedia: state.socialMedia.filter((_, i) => i !== action.payload) };
    case SET_CURRENT_PAGE:
      return { ...state, currentPage: action.payload };
    default:
      return state;
  }
};

// ---------------- CONTEXT ----------------
const ResumeContext = createContext();
const useResume = () => useContext(ResumeContext);

// ---------------- PROFILE PAGE ----------------
const ProfilePage = () => {
  const { state, dispatch } = useResume();
  const { profile } = state;
  const handleChange = (f, v) => dispatch({ type: UPDATE_PROFILE, payload: { [f]: v } });

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold flex items-center gap-2"><User /> Profile</h2>
      <div className="grid md:grid-cols-2 gap-4">
        <input name="fname" value={profile.fname} onChange={(e)=>handleChange('fname', e.target.value)} placeholder="First Name" className="border p-2 rounded"/>
        <input name="lname" value={profile.lname} onChange={(e)=>handleChange('lname', e.target.value)} placeholder="Last Name" className="border p-2 rounded"/>
        <input name="phone" value={profile.phone} onChange={(e)=>handleChange('phone', e.target.value)} placeholder="Phone" className="border p-2 rounded"/>
        <input name="url" value={profile.url} onChange={(e)=>handleChange('url', e.target.value)} placeholder="Website URL" className="border p-2 rounded"/>
        <textarea name="address" value={profile.address} onChange={(e)=>handleChange('address', e.target.value)} placeholder="Address" className="border p-2 rounded md:col-span-2"/>
      </div>
    </div>
  );
};

// ---------------- EDUCATION PAGE ----------------
const EducationPage = () => {
  const { state, dispatch } = useResume();
  const add = () => dispatch({ type: ADD_EDUCATION });
  const update = (i, f, v) => {
    const newEdu = { ...state.education[i], [f]: v };
    dispatch({ type: UPDATE_EDUCATION, payload: { index: i, education: newEdu } });
  };
  const del = (i) => dispatch({ type: DELETE_EDUCATION, payload: i });

  return (
    <div>
      <div className="flex justify-between items-center mb-4"><h2 className="font-bold text-2xl flex gap-2 items-center"><GraduationCap/> Education</h2><button id="add_education" onClick={add} className="bg-blue-600 text-white px-4 py-2 rounded">+ Add</button></div>
      {state.education.map((e,i)=>(
        <div key={i} className="border p-4 rounded mb-3">
          <div className="flex justify-between"><h3>Education #{i+1}</h3><button id="delete" onClick={()=>del(i)}><Trash2/></button></div>
          <input name="courseName" value={e.courseName} onChange={(ev)=>update(i,'courseName',ev.target.value)} placeholder="Course Name" className="border p-2 w-full my-1"/>
          <input name="completionYear" value={e.completionYear} onChange={(ev)=>update(i,'completionYear',ev.target.value)} placeholder="Year" className="border p-2 w-full my-1"/>
          <input name="college" value={e.college} onChange={(ev)=>update(i,'college',ev.target.value)} placeholder="College" className="border p-2 w-full my-1"/>
          <input name="percentage" value={e.percentage} onChange={(ev)=>update(i,'percentage',ev.target.value)} placeholder="Percentage/GPA" className="border p-2 w-full my-1"/>
        </div>
      ))}
    </div>
  );
};

// ---------------- SKILLS PAGE ----------------
const SkillsPage = () => {
  const { state, dispatch } = useResume();
  const [val, setVal] = useState('');
  const add = () => { if(val.trim()){dispatch({ type: ADD_SKILL, payload: val }); setVal('');}};
  const del = (i)=>dispatch({ type: DELETE_SKILL, payload:i });
  return (
    <div>
      <h2 className="font-bold text-2xl flex gap-2 items-center"><Code/> Skills</h2>
      <div className="flex gap-2 my-3"><input name="skill" value={val} onChange={e=>setVal(e.target.value)} placeholder="Skill" className="border p-2 flex-1"/><button id="add_skill" onClick={add} className="bg-blue-600 text-white px-3 rounded"><Plus/></button></div>
      <div className="flex gap-2 flex-wrap">{state.skills.map((s,i)=><div key={i} className="bg-blue-100 px-3 py-1 rounded-full flex gap-2 items-center">{s}<button id="delete_skill" onClick={()=>del(i)}><Trash2 className="w-4 h-4"/></button></div>)}</div>
    </div>
  );
};

// ---------------- PROJECTS PAGE ----------------
const ProjectsPage = () => {
  const { state, dispatch } = useResume();
  const add = ()=>dispatch({ type: ADD_PROJECT });
  const update = (i,f,v)=>dispatch({ type: UPDATE_PROJECT, payload:{ index:i, project:{ ...state.projects[i],[f]:v } }});
  const del = (i)=>dispatch({ type: DELETE_PROJECT, payload:i });
  return (
    <div>
      <div className="flex justify-between items-center mb-4"><h2 className="font-bold text-2xl flex items-center gap-2"><FolderOpen/> Projects</h2><button id="add_project" onClick={add} className="bg-blue-600 text-white px-4 py-2 rounded">+ Add</button></div>
      {state.projects.map((p,i)=>(
        <div key={i} className="border p-4 rounded mb-3">
          <div className="flex justify-between"><h3>Project #{i+1}</h3><button id="delete" onClick={()=>del(i)}><Trash2/></button></div>
          <input name="projectName" value={p.projectName} onChange={(e)=>update(i,'projectName',e.target.value)} placeholder="Project Name" className="border p-2 w-full my-1"/>
          <input name="techStack" value={p.techStack} onChange={(e)=>update(i,'techStack',e.target.value)} placeholder="Tech Stack" className="border p-2 w-full my-1"/>
          <textarea name="description" value={p.description} onChange={(e)=>update(i,'description',e.target.value)} placeholder="Description" className="border p-2 w-full my-1"/>
        </div>
      ))}
    </div>
  );
};

// ---------------- SOCIAL MEDIA PAGE ----------------
const SocialMediaPage = () => {
  const { state, dispatch } = useResume();
  const [val, setVal] = useState('');
  const add = ()=>{ if(val.trim()){dispatch({ type: ADD_SOCIAL, payload:val }); setVal('');}};
  const del = (i)=>dispatch({ type: DELETE_SOCIAL, payload:i });
  return (
    <div>
      <h2 className="font-bold text-2xl flex items-center gap-2"><Globe/> Social Media</h2>
      <div className="flex gap-2 my-3"><input name="Social" value={val} onChange={e=>setVal(e.target.value)} placeholder="URL" className="border p-2 flex-1"/><button id="add_social" onClick={add} className="bg-blue-600 text-white px-3 rounded"><Plus/></button></div>
      {state.socialMedia.map((s,i)=><div key={i} className="flex justify-between bg-gray-100 p-2 rounded my-1"><a href={s} target="_blank" rel="noreferrer" className="text-blue-600">{s}</a><button onClick={()=>del(i)}><Trash2/></button></div>)}
    </div>
  );
};

// ---------------- PREVIEW PAGE ----------------
const ResumePreview = () => {
  const { state } = useResume();
  return (
    <div className="p-6 bg-white border rounded">
      <h1 className="text-3xl font-bold text-center">{state.profile.fname} {state.profile.lname}</h1>
      <p className="text-center text-gray-600">{state.profile.phone} | {state.profile.url}</p>
      <p className="text-center text-gray-600">{state.profile.address}</p>
      <hr className="my-4"/>
      {state.education.length>0 && <><h2 className="font-bold text-xl">Education</h2>{state.education.map((e,i)=><p key={i}>{e.courseName} - {e.college} ({e.completionYear}) {e.percentage}</p>)}</>}
      {state.skills.length>0 && <><h2 className="font-bold text-xl mt-3">Skills</h2><div className="flex flex-wrap gap-2">{state.skills.map((s,i)=><span key={i} className="bg-blue-100 px-2 rounded">{s}</span>)}</div></>}
      {state.projects.length>0 && <><h2 className="font-bold text-xl mt-3">Projects</h2>{state.projects.map((p,i)=><div key={i}><h3 className="font-semibold">{p.projectName}</h3><p>{p.techStack}</p><p>{p.description}</p></div>)}</>}
      {state.socialMedia.length>0 && <><h2 className="font-bold text-xl mt-3">Social Media</h2>{state.socialMedia.map((s,i)=><p key={i}><a href={s} className="text-blue-600">{s}</a></p>)}</>}
    </div>
  );
};

// ---------------- NAVIGATION ----------------
const Navigation = () => {
  const { state, dispatch } = useResume();
  const back=()=>dispatch({ type: SET_CURRENT_PAGE, payload: state.currentPage-1 });
  const next=()=>dispatch({ type: SET_CURRENT_PAGE, payload: state.currentPage+1 });
  const save=()=>{ alert("Resume Saved!"); console.log(state);};
  return (
    <div className="flex justify-between my-4">
      <button id="back" onClick={back} disabled={state.currentPage===1} className="px-4 py-2 bg-gray-300 rounded flex items-center gap-2"><ArrowLeft/> Back</button>
      <button id="save_continue" onClick={save} className="px-4 py-2 bg-green-600 text-white rounded flex items-center gap-2"><Save/> Save</button>
      <button id="next" onClick={next} disabled={state.currentPage===6} className="px-4 py-2 bg-blue-600 text-white rounded flex items-center gap-2">Next <ArrowRight/></button>
    </div>
  );
};

// ---------------- MAIN APP ----------------
export default function ResumeBuilder() {
  const [state, dispatch] = useReducer(resumeReducer, initialState);
  const render=()=>({1:<ProfilePage/>,2:<EducationPage/>,3:<SkillsPage/>,4:<ProjectsPage/>,5:<SocialMediaPage/>,6:<ResumePreview/>}[state.currentPage]);

  return (
    <ResumeContext.Provider value={{ state, dispatch }}>
      <div className="min-h-screen bg-gray-100 p-6">
        <h1 className="text-3xl font-bold text-center mb-6">Resume Builder</h1>
        <Navigation/>
        <div className="bg-white p-6 rounded shadow">{render()}</div>
      </div>
    </ResumeContext.Provider>
  );
}
