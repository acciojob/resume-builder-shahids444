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

// CSS Styles
const styles = {
  container: {
    minHeight: '100vh',
    backgroundColor: '#f5f5f5',
    fontFamily: 'Arial, sans-serif'
  },
  mainCard: {
    maxWidth: '1200px',
    margin: '0 auto',
    backgroundColor: 'white',
    borderRadius: '8px',
    boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
    overflow: 'hidden'
  },
  header: {
    background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
    color: 'white',
    padding: '2rem',
    textAlign: 'center'
  },
  headerTitle: {
    fontSize: '2.5rem',
    fontWeight: 'bold',
    margin: '0'
  },
  loadButton: {
    backgroundColor: 'white',
    color: '#667eea',
    padding: '0.75rem 1.5rem',
    border: 'none',
    borderRadius: '6px',
    cursor: 'pointer',
    marginTop: '1rem',
    fontWeight: '500'
  },
  progressBar: {
    width: '100%',
    height: '4px',
    backgroundColor: '#e2e8f0',
    position: 'relative'
  },
  progressFill: {
    height: '100%',
    backgroundColor: '#4f46e5',
    transition: 'width 0.3s ease'
  },
  pageIndicator: {
    backgroundColor: '#f8fafc',
    padding: '1rem',
    display: 'flex',
    justifyContent: 'center',
    gap: '1rem',
    flexWrap: 'wrap'
  },
  pageTab: {
    padding: '0.5rem 1rem',
    borderRadius: '20px',
    fontSize: '0.875rem',
    fontWeight: '500'
  },
  pageTabActive: {
    backgroundColor: '#4f46e5',
    color: 'white'
  },
  pageTabComplete: {
    backgroundColor: '#10b981',
    color: 'white'
  },
  pageTabInactive: {
    backgroundColor: '#e2e8f0',
    color: '#64748b'
  },
  pageContent: {
    padding: '2rem'
  },
  pageTitle: {
    fontSize: '2rem',
    fontWeight: 'bold',
    color: '#1f2937',
    marginBottom: '2rem'
  },
  formGroup: {
    marginBottom: '1.5rem'
  },
  label: {
    display: 'block',
    fontSize: '0.875rem',
    fontWeight: '600',
    color: '#374151',
    marginBottom: '0.5rem'
  },
  input: {
    width: '100%',
    padding: '0.75rem',
    border: '1px solid #d1d5db',
    borderRadius: '6px',
    fontSize: '1rem',
    transition: 'border-color 0.2s, box-shadow 0.2s',
    boxSizing: 'border-box'
  },
  inputFocus: {
    outline: 'none',
    borderColor: '#4f46e5',
    boxShadow: '0 0 0 3px rgba(79, 70, 229, 0.1)'
  },
  textarea: {
    width: '100%',
    padding: '0.75rem',
    border: '1px solid #d1d5db',
    borderRadius: '6px',
    fontSize: '1rem',
    minHeight: '100px',
    resize: 'vertical',
    boxSizing: 'border-box'
  },
  gridTwoColumns: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
    gap: '1rem'
  },
  addSection: {
    backgroundColor: '#f8fafc',
    padding: '1.5rem',
    borderRadius: '8px',
    marginBottom: '2rem'
  },
  addSectionTitle: {
    fontSize: '1.25rem',
    fontWeight: '600',
    marginBottom: '1rem'
  },
  button: {
    padding: '0.75rem 1.5rem',
    border: 'none',
    borderRadius: '6px',
    fontSize: '1rem',
    fontWeight: '500',
    cursor: 'pointer',
    transition: 'background-color 0.2s'
  },
  buttonPrimary: {
    backgroundColor: '#4f46e5',
    color: 'white'
  },
  buttonSecondary: {
    backgroundColor: '#6b7280',
    color: 'white'
  },
  buttonDanger: {
    backgroundColor: '#ef4444',
    color: 'white'
  },
  buttonDisabled: {
    backgroundColor: '#d1d5db',
    color: '#9ca3af',
    cursor: 'not-allowed'
  },
  flexBetween: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  flexGap: {
    display: 'flex',
    gap: '1rem',
    alignItems: 'center'
  },
  skillTag: {
    display: 'inline-flex',
    alignItems: 'center',
    backgroundColor: '#dbeafe',
    color: '#1e40af',
    padding: '0.5rem 1rem',
    borderRadius: '20px',
    margin: '0.25rem',
    gap: '0.5rem'
  },
  deleteButton: {
    backgroundColor: 'transparent',
    border: 'none',
    color: '#ef4444',
    cursor: 'pointer',
    fontWeight: 'bold',
    fontSize: '1.2rem'
  },
  card: {
    backgroundColor: 'white',
    border: '1px solid #e5e7eb',
    borderRadius: '8px',
    padding: '1.5rem',
    marginBottom: '1rem'
  },
  navigation: {
    backgroundColor: '#f8fafc',
    padding: '1.5rem',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  navigationButtons: {
    display: 'flex',
    gap: '1rem'
  }
};

// Profile Page Component
const ProfilePage = ({ state, dispatch }) => {
  const handleInputChange = (field, value) => {
    dispatch({ type: 'UPDATE_PROFILE', payload: { [field]: value } });
  };

  return (
    <div>
      <h2 style={styles.pageTitle}>Add your profile details</h2>
      
      <div style={styles.gridTwoColumns}>
        <div style={styles.formGroup}>
          <label style={styles.label}>First Name</label>
          <input
            name="fname"
            type="text"
            value={state.profile.fname}
            onChange={(e) => handleInputChange('fname', e.target.value)}
            style={styles.input}
            placeholder="Enter first name"
          />
        </div>
        
        <div style={styles.formGroup}>
          <label style={styles.label}>Last Name</label>
          <input
            name="lname"
            type="text"
            value={state.profile.lname}
            onChange={(e) => handleInputChange('lname', e.target.value)}
            style={styles.input}
            placeholder="Enter last name"
          />
        </div>
      </div>
      
      <div style={styles.formGroup}>
        <label style={styles.label}>Phone</label>
        <input
          name="phone"
          type="tel"
          value={state.profile.phone}
          onChange={(e) => handleInputChange('phone', e.target.value)}
          style={styles.input}
          placeholder="Enter phone number"
        />
      </div>
      
      <div style={styles.formGroup}>
        <label style={styles.label}>Address</label>
        <input
          name="address"
          type="text"
          value={state.profile.address}
          onChange={(e) => handleInputChange('address', e.target.value)}
          style={styles.input}
          placeholder="Enter your address"
        />
      </div>
      
      <div style={styles.formGroup}>
        <label style={styles.label}>Portfolio/Website URL</label>
        <input
          name="url"
          type="url"
          value={state.profile.url}
          onChange={(e) => handleInputChange('url', e.target.value)}
          style={styles.input}
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
    <div>
      <h2 style={styles.pageTitle}>Add your Education Details</h2>
      
      <div style={styles.addSection}>
        <h3 style={styles.addSectionTitle}>Add Education</h3>
        <div style={styles.gridTwoColumns}>
          <input
            name="courseName"
            type="text"
            value={newEducation.courseName}
            onChange={(e) => setNewEducation({ ...newEducation, courseName: e.target.value })}
            style={styles.input}
            placeholder="Course Name"
          />
          <input
            name="completionYear"
            type="text"
            value={newEducation.completionYear}
            onChange={(e) => setNewEducation({ ...newEducation, completionYear: e.target.value })}
            style={styles.input}
            placeholder="Completion Year"
          />
          <input
            name="college"
            type="text"
            value={newEducation.college}
            onChange={(e) => setNewEducation({ ...newEducation, college: e.target.value })}
            style={styles.input}
            placeholder="College/University"
          />
          <input
            name="percentage"
            type="text"
            value={newEducation.percentage}
            onChange={(e) => setNewEducation({ ...newEducation, percentage: e.target.value })}
            style={styles.input}
            placeholder="Percentage/GPA"
          />
        </div>
        <div className="makeStyles-footer-15">
          <button
            id="add_education"
            onClick={handleAddEducation}
            className="MuiButton-contained"
            style={{...styles.button, ...styles.buttonPrimary, marginTop: '1rem'}}
          >
            Add Education
          </button>
        </div>
      </div>

      <div>
        {state.education.map((edu, index) => (
          <div key={index} style={styles.card}>
            <div style={styles.flexBetween}>
              <div>
                <h4 style={{fontWeight: '600', fontSize: '1.125rem'}}>{edu.courseName}</h4>
                <p style={{color: '#6b7280'}}>{edu.college}</p>
                <p style={{color: '#9ca3af'}}>{edu.completionYear} • {edu.percentage}</p>
              </div>
              <button
                id="delete"
                onClick={() => handleDeleteEducation(index)}
                style={{...styles.button, ...styles.buttonDanger}}
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
    <div>
      <h2 style={styles.pageTitle}>Add your Skills</h2>
      
      <div style={styles.addSection}>
        <h3 style={styles.addSectionTitle}>Add Skill</h3>
        <div style={styles.flexGap}>
          <input
            name="skill"
            type="text"
            value={state.skills.length}
            onChange={(e) => setNewSkill(e.target.value)}
            style={{...styles.input, flex: '1'}}
            placeholder="Enter a skill"
          />
          <button
            id="add_skill"
            onClick={handleAddSkill}
            style={{...styles.button, ...styles.buttonPrimary}}
          >
            Add Skill
          </button>
        </div>
      </div>

      <div>
        {state.skills.map((skill, index) => (
          <div key={index} style={styles.skillTag}>
            <span>{skill}</span>
            <button
              id="delete_skill"
              onClick={() => handleDeleteSkill(index)}
              style={styles.deleteButton}
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
    <div>
      <h2 style={styles.pageTitle}>Add your Mini Projects</h2>
      
      <div style={styles.addSection}>
        <h3 style={styles.addSectionTitle}>Add Project</h3>
        <div style={{display: 'flex', flexDirection: 'column', gap: '1rem'}}>
          <input
            name="projectName"
            type="text"
            value={state.projects.length}
            onChange={(e) => setNewProject({ ...newProject, projectName: e.target.value })}
            style={styles.input}
            placeholder="Project Name"
          />
          <input
            name="techStack"
            type="text"
            value={newProject.techStack}
            onChange={(e) => setNewProject({ ...newProject, techStack: e.target.value })}
            style={styles.input}
            placeholder="Tech Stack (e.g., React, Node.js, MongoDB)"
          />
          <textarea
            name="description"
            value={newProject.description}
            onChange={(e) => setNewProject({ ...newProject, description: e.target.value })}
            style={styles.textarea}
            placeholder="Project Description"
          />
        </div>
        <button
          id="add_project"
          onClick={handleAddProject}
          style={{...styles.button, ...styles.buttonPrimary, marginTop: '1rem'}}
        >
          Add Project
        </button>
      </div>

      <div>
        {state.projects.map((project, index) => (
          <div key={index} style={styles.card}>
            <div style={styles.flexBetween}>
              <div style={{flex: '1'}}>
                <h4 style={{fontWeight: '600', fontSize: '1.125rem'}}>{project.projectName}</h4>
                <p style={{color: '#4f46e5', fontWeight: '500'}}>{project.techStack}</p>
                <p style={{color: '#6b7280', marginTop: '0.5rem'}}>{project.description}</p>
              </div>
              <button
                id="delete"
                onClick={() => handleDeleteProject(index)}
                style={{...styles.button, ...styles.buttonDanger}}
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
    <div>
      <h2 style={styles.pageTitle}>Add your Social Media Links</h2>
      
      <div style={styles.addSection}>
        <h3 style={styles.addSectionTitle}>Add Social Media Link</h3>
        <div style={styles.flexGap}>
          <input
            name="Social"
            type="url"
            value={state.socialMedia.length}
            onChange={(e) => setNewSocial(e.target.value)}
            style={{...styles.input, flex: '1'}}
            placeholder="https://linkedin.com/in/yourprofile"
          />
          <button
            id="add_social"
            onClick={handleAddSocial}
            style={{...styles.button, ...styles.buttonPrimary}}
          >
            Add Social
          </button>
        </div>
      </div>

      <div>
        {state.socialMedia.map((social, index) => (
          <div key={index} style={{...styles.card, display: 'flex', justifyContent: 'space-between', alignItems: 'center'}}>
            <a href={social} style={{color: '#4f46e5', textDecoration: 'none'}} target="_blank" rel="noopener noreferrer">
              {social}
            </a>
            <button
              onClick={() => handleDeleteSocial(index)}
              style={styles.deleteButton}
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
    <div>
      <div style={styles.flexBetween}>
        <h2 style={styles.pageTitle}>Resume Preview</h2>
        <button
          onClick={saveToDatabase}
          style={{...styles.button, backgroundColor: '#10b981', color: 'white'}}
        >
          Save Resume
        </button>
      </div>
      
      <div style={{
        backgroundColor: 'white',
        padding: '2rem',
        border: '2px solid #e5e7eb',
        borderRadius: '8px',
        maxWidth: '800px',
        margin: '0 auto'
      }}>
        {/* Profile Section */}
        <div style={{textAlign: 'center', marginBottom: '2rem'}}>
          <h1 style={{fontSize: '2rem', fontWeight: 'bold', color: '#1f2937', margin: '0'}}>
            {state.profile.fname} {state.profile.lname}
          </h1>
          <div style={{marginTop: '0.5rem', color: '#6b7280'}}>
            <p>{state.profile.phone}</p>
            <p>{state.profile.address}</p>
            {state.profile.url && (
              <a href={state.profile.url} style={{color: '#4f46e5', textDecoration: 'none'}}>
                {state.profile.url}
              </a>
            )}
          </div>
        </div>

        {/* Education Section */}
        {state.education.length > 0 && (
          <div style={{marginBottom: '1.5rem'}}>
            <h3 style={{fontSize: '1.25rem', fontWeight: 'bold', color: '#1f2937', borderBottom: '2px solid #e5e7eb', paddingBottom: '0.5rem', marginBottom: '1rem'}}>
              Education
            </h3>
            {state.education.map((edu, index) => (
              <div key={index} style={{marginBottom: '0.75rem'}}>
                <div style={styles.flexBetween}>
                  <div>
                    <h4 style={{fontWeight: '600'}}>{edu.courseName}</h4>
                    <p style={{color: '#6b7280'}}>{edu.college}</p>
                  </div>
                  <div style={{textAlign: 'right', color: '#9ca3af'}}>
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
          <div style={{marginBottom: '1.5rem'}}>
            <h3 style={{fontSize: '1.25rem', fontWeight: 'bold', color: '#1f2937', borderBottom: '2px solid #e5e7eb', paddingBottom: '0.5rem', marginBottom: '1rem'}}>
              Skills
            </h3>
            <div style={{display: 'flex', flexWrap: 'wrap', gap: '0.5rem'}}>
              {state.skills.map((skill, index) => (
                <span key={index} style={{backgroundColor: '#dbeafe', color: '#1e40af', padding: '0.25rem 0.75rem', borderRadius: '20px', fontSize: '0.875rem'}}>
                  {skill}
                </span>
              ))}
            </div>
          </div>
        )}

        {/* Projects Section */}
        {state.projects.length > 0 && (
          <div style={{marginBottom: '1.5rem'}}>
            <h3 style={{fontSize: '1.25rem', fontWeight: 'bold', color: '#1f2937', borderBottom: '2px solid #e5e7eb', paddingBottom: '0.5rem', marginBottom: '1rem'}}>
              Projects
            </h3>
            {state.projects.map((project, index) => (
              <div key={index} style={{marginBottom: '1rem'}}>
                <h4 style={{fontWeight: '600'}}>{project.projectName}</h4>
                <p style={{color: '#4f46e5', fontSize: '0.875rem', fontWeight: '500'}}>{project.techStack}</p>
                <p style={{color: '#6b7280', marginTop: '0.25rem'}}>{project.description}</p>
              </div>
            ))}
          </div>
        )}

        {/* Social Media Section */}
        {state.socialMedia.length > 0 && (
          <div style={{marginBottom: '1.5rem'}}>
            <h3 style={{fontSize: '1.25rem', fontWeight: 'bold', color: '#1f2937', borderBottom: '2px solid #e5e7eb', paddingBottom: '0.5rem', marginBottom: '1rem'}}>
              Social Media
            </h3>
            <div style={{display: 'flex', flexDirection: 'column', gap: '0.25rem'}}>
              {state.socialMedia.map((social, index) => (
                <a key={index} href={social} style={{color: '#4f46e5', textDecoration: 'none'}}>
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
    <div style={styles.container}>
      <div style={styles.mainCard}>
        {/* Header */}
        <div style={styles.header}>
          <h1 style={styles.headerTitle}>RESUME GENERATOR</h1>
          <button
            onClick={loadSampleData}
            style={styles.loadButton}
          >
            Load Sample Data
          </button>
        </div>

        {/* Progress Bar */}
        <div style={styles.progressBar}>
          <div 
            style={{
              ...styles.progressFill,
              width: `${((state.currentPage + 1) / pages.length) * 100}%`
            }}
          />
        </div>

        {/* Page Indicator */}
        <div style={styles.pageIndicator}>
          {pages.map((page, index) => {
            let tabStyle = {...styles.pageTab};
            if (index === state.currentPage) {
              tabStyle = {...tabStyle, ...styles.pageTabActive};
            } else if (index < state.currentPage) {
              tabStyle = {...tabStyle, ...styles.pageTabComplete};
            } else {
              tabStyle = {...tabStyle, ...styles.pageTabInactive};
            }
            
            return (
              <div key={index} style={tabStyle}>
                {index + 1}. {page.title}
              </div>
            );
          })}
        </div>

        {/* Page Content */}
        <div style={styles.pageContent}>
          {React.createElement(currentPageComponent, { state, dispatch })}
        </div>

        {/* Navigation */}
        <div style={styles.navigation}>
          <button
            id="back"
            onClick={handleBack}
            disabled={state.currentPage === 0}
            style={{
              ...styles.button,
              ...(state.currentPage === 0 ? styles.buttonDisabled : styles.buttonSecondary)
            }}
          >
            Back
          </button>

          <div style={styles.navigationButtons}>
            <button
              id="save_continue"
              onClick={handleSave}
              style={{...styles.button, backgroundColor: '#f59e0b', color: 'white'}}
            >
              Save
            </button>

            <button
              id="next"
              onClick={handleNext}
              disabled={state.currentPage === pages.length - 1}
              style={{
                ...styles.button,
                ...(state.currentPage === pages.length - 1 ? styles.buttonDisabled : styles.buttonPrimary)
              }}
            >
              {state.currentPage === pages.length - 1 ? 'Finished' : 'Next'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ResumeBuilder;
