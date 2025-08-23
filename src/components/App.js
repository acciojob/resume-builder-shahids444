import React, { useReducer, useState } from 'react';

// Redux-like state management using useReducer
const initialState = {
  currentPage: 0,
  profile: {
    fname: '',
    lname: '',
    phone: '',
    address: '',
    url: ''
  },
  education: [],
  skills: [],
  projects: [],
  socialMedia: []
};

const resumeReducer = (state, action) => {
  switch (action.type) {
    case 'SET_CURRENT_PAGE':
      return { ...state, currentPage: action.payload };
    
    case 'UPDATE_PROFILE':
      return { ...state, profile: { ...state.profile, ...action.payload } };
    
    case 'ADD_EDUCATION':
      return { ...state, education: [...state.education, action.payload] };
    
    case 'UPDATE_EDUCATION':
      return {
        ...state,
        education: state.education.map((item, index) =>
          index === action.index ? { ...item, ...action.payload } : item
        )
      };
    
    case 'DELETE_EDUCATION':
      return {
        ...state,
        education: state.education.filter((_, index) => index !== action.index)
      };
    
    case 'ADD_SKILL':
      return { ...state, skills: [...state.skills, action.payload] };
    
    case 'DELETE_SKILL':
      return {
        ...state,
        skills: state.skills.filter((_, index) => index !== action.index)
      };
    
    case 'ADD_PROJECT':
      return { ...state, projects: [...state.projects, action.payload] };
    
    case 'UPDATE_PROJECT':
      return {
        ...state,
        projects: state.projects.map((item, index) =>
          index === action.index ? { ...item, ...action.payload } : item
        )
      };
    
    case 'DELETE_PROJECT':
      return {
        ...state,
        projects: state.projects.filter((_, index) => index !== action.index)
      };
    
    case 'ADD_SOCIAL':
      return { ...state, socialMedia: [...state.socialMedia, action.payload] };
    
    case 'DELETE_SOCIAL':
      return {
        ...state,
        socialMedia: state.socialMedia.filter((_, index) => index !== action.index)
      };
    
    case 'LOAD_RESUME':
      return { ...action.payload, currentPage: 0 };
    
    default:
      return state;
  }
};

// Profile Page Component
const ProfilePage = ({ state, dispatch }) => {
  const handleInputChange = (field, value) => {
    dispatch({ type: 'UPDATE_PROFILE', payload: { [field]: value } });
  };

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-gray-800 mb-6">Profile Information</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">First Name</label>
          <input
            name="fname"
            type="text"
            value={state.profile.fname}
            onChange={(e) => handleInputChange('fname', e.target.value)}
            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            placeholder="Enter first name"
          />
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Last Name</label>
          <input
            name="lname"
            type="text"
            value={state.profile.lname}
            onChange={(e) => handleInputChange('lname', e.target.value)}
            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            placeholder="Enter last name"
          />
        </div>
      </div>
      
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">Phone</label>
        <input
          name="phone"
          type="tel"
          value={state.profile.phone}
          onChange={(e) => handleInputChange('phone', e.target.value)}
          className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          placeholder="Enter phone number"
        />
      </div>
      
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">Address</label>
        <textarea
          name="address"
          value={state.profile.address}
          onChange={(e) => handleInputChange('address', e.target.value)}
          className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          rows="3"
          placeholder="Enter your address"
        />
      </div>
      
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">Portfolio/Website URL</label>
        <input
          name="url"
          type="url"
          value={state.profile.url}
          onChange={(e) => handleInputChange('url', e.target.value)}
          className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          placeholder="https://your-website.com"
        />
      </div>
    </div>
  );
};

// Education Page Component
const EducationPage = ({ state, dispatch }) => {
  const [newEducation, setNewEducation] = useState({
    courseName: '',
    completionYear: '',
    college: '',
    percentage: ''
  });

  const handleAddEducation = () => {
    if (newEducation.courseName.trim()) {
      dispatch({ type: 'ADD_EDUCATION', payload: newEducation });
      setNewEducation({ courseName: '', completionYear: '', college: '', percentage: '' });
    }
  };

  const handleDeleteEducation = (index) => {
    dispatch({ type: 'DELETE_EDUCATION', index });
  };

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-gray-800 mb-6">Education</h2>
      
      <div className="bg-gray-50 p-4 rounded-lg">
        <h3 className="text-lg font-semibold mb-4">Add Education</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <input
            name="courseName"
            type="text"
            value={newEducation.courseName}
            onChange={(e) => setNewEducation({ ...newEducation, courseName: e.target.value })}
            className="p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            placeholder="Course Name"
          />
          <input
            name="completionYear"
            type="text"
            value={newEducation.completionYear}
            onChange={(e) => setNewEducation({ ...newEducation, completionYear: e.target.value })}
            className="p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            placeholder="Completion Year"
          />
          <input
            name="college"
            type="text"
            value={newEducation.college}
            onChange={(e) => setNewEducation({ ...newEducation, college: e.target.value })}
            className="p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            placeholder="College/University"
          />
          <input
            name="percentage"
            type="text"
            value={newEducation.percentage}
            onChange={(e) => setNewEducation({ ...newEducation, percentage: e.target.value })}
            className="p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            placeholder="Percentage/GPA"
          />
        </div>
        <button
          id="add_education"
          onClick={handleAddEducation}
          className="mt-4 bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors"
        >
          Add Education
        </button>
      </div>

      <div className="space-y-4">
        {state.education.map((edu, index) => (
          <div key={index} className="bg-white p-4 border border-gray-200 rounded-lg">
            <div className="flex justify-between items-start">
              <div className="flex-1">
                <h4 className="font-semibold text-lg">{edu.courseName}</h4>
                <p className="text-gray-600">{edu.college}</p>
                <p className="text-gray-500">{edu.completionYear} • {edu.percentage}</p>
              </div>
              <button
                id="delete"
                onClick={() => handleDeleteEducation(index)}
                className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition-colors"
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

// Skills Page Component
const SkillsPage = ({ state, dispatch }) => {
  const [newSkill, setNewSkill] = useState('');

  const handleAddSkill = () => {
    if (newSkill.trim()) {
      dispatch({ type: 'ADD_SKILL', payload: newSkill });
      setNewSkill('');
    }
  };

  const handleDeleteSkill = (index) => {
    dispatch({ type: 'DELETE_SKILL', index });
  };

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-gray-800 mb-6">Skills</h2>
      
      <div className="bg-gray-50 p-4 rounded-lg">
        <h3 className="text-lg font-semibold mb-4">Add Skill</h3>
        <div className="flex gap-4">
          <input
            name="skill"
            type="text"
            value={newSkill}
            onChange={(e) => setNewSkill(e.target.value)}
            className="flex-1 p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            placeholder="Enter a skill"
          />
          <button
            id="add_skill"
            onClick={handleAddSkill}
            className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors"
          >
            Add Skill
          </button>
        </div>
      </div>

      <div className="flex flex-wrap gap-2">
        {state.skills.map((skill, index) => (
          <div key={index} className="bg-blue-100 px-4 py-2 rounded-full flex items-center gap-2">
            <span className="text-blue-800">{skill}</span>
            <button
              id="delete_skill"
              onClick={() => handleDeleteSkill(index)}
              className="text-red-500 hover:text-red-700 font-bold"
            >
              ×
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

// Projects Page Component
const ProjectsPage = ({ state, dispatch }) => {
  const [newProject, setNewProject] = useState({
    projectName: '',
    techStack: '',
    description: ''
  });

  const handleAddProject = () => {
    if (newProject.projectName.trim()) {
      dispatch({ type: 'ADD_PROJECT', payload: newProject });
      setNewProject({ projectName: '', techStack: '', description: '' });
    }
  };

  const handleDeleteProject = (index) => {
    dispatch({ type: 'DELETE_PROJECT', index });
  };

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-gray-800 mb-6">Projects</h2>
      
      <div className="bg-gray-50 p-4 rounded-lg">
        <h3 className="text-lg font-semibold mb-4">Add Project</h3>
        <div className="space-y-4">
          <input
            name="projectName"
            type="text"
            value={newProject.projectName}
            onChange={(e) => setNewProject({ ...newProject, projectName: e.target.value })}
            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            placeholder="Project Name"
          />
          <input
            name="techStack"
            type="text"
            value={newProject.techStack}
            onChange={(e) => setNewProject({ ...newProject, techStack: e.target.value })}
            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            placeholder="Tech Stack (e.g., React, Node.js, MongoDB)"
          />
          <textarea
            name="description"
            value={newProject.description}
            onChange={(e) => setNewProject({ ...newProject, description: e.target.value })}
            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            rows="3"
            placeholder="Project Description"
          />
        </div>
        <button
          id="add_project"
          onClick={handleAddProject}
          className="mt-4 bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors"
        >
          Add Project
        </button>
      </div>

      <div className="space-y-4">
        {state.projects.map((project, index) => (
          <div key={index} className="bg-white p-4 border border-gray-200 rounded-lg">
            <div className="flex justify-between items-start">
              <div className="flex-1">
                <h4 className="font-semibold text-lg">{project.projectName}</h4>
                <p className="text-blue-600 font-medium">{project.techStack}</p>
                <p className="text-gray-600 mt-2">{project.description}</p>
              </div>
              <button
                id="delete"
                onClick={() => handleDeleteProject(index)}
                className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition-colors"
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

// Social Media Page Component
const SocialMediaPage = ({ state, dispatch }) => {
  const [newSocial, setNewSocial] = useState('');

  const handleAddSocial = () => {
    if (newSocial.trim()) {
      dispatch({ type: 'ADD_SOCIAL', payload: newSocial });
      setNewSocial('');
    }
  };

  const handleDeleteSocial = (index) => {
    dispatch({ type: 'DELETE_SOCIAL', index });
  };

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-gray-800 mb-6">Social Media</h2>
      
      <div className="bg-gray-50 p-4 rounded-lg">
        <h3 className="text-lg font-semibold mb-4">Add Social Media Link</h3>
        <div className="flex gap-4">
          <input
            name="Social"
            type="url"
            value={newSocial}
            onChange={(e) => setNewSocial(e.target.value)}
            className="flex-1 p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            placeholder="https://linkedin.com/in/yourprofile"
          />
          <button
            id="add_social"
            onClick={handleAddSocial}
            className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors"
          >
            Add Social
          </button>
        </div>
      </div>

      <div className="space-y-2">
        {state.socialMedia.map((social, index) => (
          <div key={index} className="bg-white p-3 border border-gray-200 rounded-lg flex justify-between items-center">
            <a href={social} className="text-blue-600 hover:underline" target="_blank" rel="noopener noreferrer">
              {social}
            </a>
            <button
              onClick={() => handleDeleteSocial(index)}
              className="text-red-500 hover:text-red-700 font-bold"
            >
              ×
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

// Resume Preview Component
const ResumePreview = ({ state }) => {
  const saveToDatabase = () => {
    // Simulate saving to database
    const resumeData = JSON.stringify(state, null, 2);
    console.log('Saving resume to database:', resumeData);
    alert('Resume saved successfully!');
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-gray-800">Resume Preview</h2>
        <button
          onClick={saveToDatabase}
          className="bg-green-600 text-white px-6 py-2 rounded-lg hover:bg-green-700 transition-colors"
        >
          Save Resume
        </button>
      </div>
      
      <div className="bg-white p-8 border-2 border-gray-200 rounded-lg max-w-4xl mx-auto">
        {/* Profile Section */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900">
            {state.profile.fname} {state.profile.lname}
          </h1>
          <div className="mt-2 text-gray-600">
            <p>{state.profile.phone}</p>
            <p>{state.profile.address}</p>
            {state.profile.url && (
              <a href={state.profile.url} className="text-blue-600 hover:underline">
                {state.profile.url}
              </a>
            )}
          </div>
        </div>

        {/* Education Section */}
        {state.education.length > 0 && (
          <div className="mb-6">
            <h3 className="text-xl font-bold text-gray-800 border-b-2 border-gray-200 pb-2 mb-4">
              Education
            </h3>
            {state.education.map((edu, index) => (
              <div key={index} className="mb-3">
                <div className="flex justify-between">
                  <div>
                    <h4 className="font-semibold">{edu.courseName}</h4>
                    <p className="text-gray-600">{edu.college}</p>
                  </div>
                  <div className="text-right text-gray-500">
                    <p>{edu.completionYear}</p>
                    <p>{edu.percentage}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Skills Section */}
        {state.skills.length > 0 && (
          <div className="mb-6">
            <h3 className="text-xl font-bold text-gray-800 border-b-2 border-gray-200 pb-2 mb-4">
              Skills
            </h3>
            <div className="flex flex-wrap gap-2">
              {state.skills.map((skill, index) => (
                <span key={index} className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm">
                  {skill}
                </span>
              ))}
            </div>
          </div>
        )}

        {/* Projects Section */}
        {state.projects.length > 0 && (
          <div className="mb-6">
            <h3 className="text-xl font-bold text-gray-800 border-b-2 border-gray-200 pb-2 mb-4">
              Projects
            </h3>
            {state.projects.map((project, index) => (
              <div key={index} className="mb-4">
                <h4 className="font-semibold">{project.projectName}</h4>
                <p className="text-blue-600 text-sm font-medium">{project.techStack}</p>
                <p className="text-gray-600 mt-1">{project.description}</p>
              </div>
            ))}
          </div>
        )}

        {/* Social Media Section */}
        {state.socialMedia.length > 0 && (
          <div className="mb-6">
            <h3 className="text-xl font-bold text-gray-800 border-b-2 border-gray-200 pb-2 mb-4">
              Social Media
            </h3>
            <div className="space-y-1">
              {state.socialMedia.map((social, index) => (
                <a key={index} href={social} className="block text-blue-600 hover:underline">
                  {social}
                </a>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

// Main Resume Builder Component
const ResumeBuilder = () => {
  const [state, dispatch] = useReducer(resumeReducer, initialState);
  const [savedResumes] = useState([]); // For demonstration - would connect to actual database

  const pages = [
    { title: 'Profile', component: ProfilePage },
    { title: 'Education', component: EducationPage },
    { title: 'Skills', component: SkillsPage },
    { title: 'Projects', component: ProjectsPage },
    { title: 'Social Media', component: SocialMediaPage },
    { title: 'Preview', component: ResumePreview }
  ];

  const currentPageComponent = pages[state.currentPage].component;

  const handleNext = () => {
    if (state.currentPage < pages.length - 1) {
      dispatch({ type: 'SET_CURRENT_PAGE', payload: state.currentPage + 1 });
    }
  };

  const handleBack = () => {
    if (state.currentPage > 0) {
      dispatch({ type: 'SET_CURRENT_PAGE', payload: state.currentPage - 1 });
    }
  };

  const handleSave = () => {
    // Simulate saving to database
    alert('Progress saved!');
  };

  const loadSampleData = () => {
    const sampleData = {
      currentPage: 0,
      profile: {
        fname: 'John',
        lname: 'Doe',
        phone: '+1 (555) 123-4567',
        address: '123 Main St, City, State 12345',
        url: 'https://johndoe.dev'
      },
      education: [
        {
          courseName: 'Computer Science',
          completionYear: '2023',
          college: 'Tech University',
          percentage: '3.8 GPA'
        }
      ],
      skills: ['JavaScript', 'React', 'Node.js', 'Python', 'SQL'],
      projects: [
        {
          projectName: 'E-commerce Platform',
          techStack: 'React, Node.js, MongoDB',
          description: 'Full-stack e-commerce application with payment integration and admin dashboard.'
        }
      ],
      socialMedia: ['https://linkedin.com/in/johndoe', 'https://github.com/johndoe']
    };
    dispatch({ type: 'LOAD_RESUME', payload: sampleData });
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <div className="container mx-auto px-4 py-8">
        <div className="bg-white rounded-lg shadow-lg overflow-hidden">
          {/* Header */}
          <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white p-6">
            <h1 className="text-3xl font-bold text-center">Resume Builder</h1>
            <div className="flex justify-center mt-4">
              <button
                onClick={loadSampleData}
                className="bg-white text-blue-600 px-4 py-2 rounded-lg hover:bg-gray-100 transition-colors"
              >
                Load Sample Data
              </button>
            </div>
          </div>

          {/* Progress Bar */}
          <div className="bg-gray-200 h-2">
            <div 
              className="bg-blue-600 h-2 transition-all duration-300"
              style={{ width: `${((state.currentPage + 1) / pages.length) * 100}%` }}
            />
          </div>

          {/* Page Indicator */}
          <div className="bg-gray-50 p-4">
            <div className="flex justify-center space-x-4">
              {pages.map((page, index) => (
                <div
                  key={index}
                  className={`px-3 py-1 rounded-full text-sm ${
                    index === state.currentPage
                      ? 'bg-blue-600 text-white'
                      : index < state.currentPage
                      ? 'bg-green-500 text-white'
                      : 'bg-gray-200 text-gray-600'
                  }`}
                >
                  {index + 1}. {page.title}
                </div>
              ))}
            </div>
          </div>

          {/* Page Content */}
          <div className="p-8">
            {React.createElement(currentPageComponent, { state, dispatch })}
          </div>

          {/* Navigation */}
          <div className="bg-gray-50 p-6 flex justify-between">
            <button
              id="back"
              onClick={handleBack}
              disabled={state.currentPage === 0}
              className={`px-6 py-2 rounded-lg transition-colors ${
                state.currentPage === 0
                  ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                  : 'bg-gray-600 text-white hover:bg-gray-700'
              }`}
            >
              Back
            </button>

            <div className="space-x-4">
              <button
                id="save_continue"
                onClick={handleSave}
                className="bg-yellow-600 text-white px-6 py-2 rounded-lg hover:bg-yellow-700 transition-colors"
              >
                Save
              </button>

              <button
                id="next"
                onClick={handleNext}
                disabled={state.currentPage === pages.length - 1}
                className={`px-6 py-2 rounded-lg transition-colors ${
                  state.currentPage === pages.length - 1
                    ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                    : 'bg-blue-600 text-white hover:bg-blue-700'
                }`}
              >
                {state.currentPage === pages.length - 1 ? 'Finished' : 'Next'}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ResumeBuilder;
