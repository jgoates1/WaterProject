import type { Project } from "../types/Project";

interface fetchProjectsResponse {
    projects: Project[];
    totalNumProjects: number;
}

const API_URL = 'https://localhost:5000/water';

export const fetchProjects = async (
    pageSize: number,
    pageNum: number,
    selectedCategories: string[]
): Promise<fetchProjectsResponse> => {
    try{
    const categoryParams = selectedCategories.map((cat) => `projectTypes=${encodeURIComponent(cat)}`).join('&');
    const response = await fetch(`${API_URL}/allprojects?pageSize=${pageSize}&pageNum=${pageNum}${selectedCategories.length ? `&${categoryParams}` : ''}`);
    
    if (!response.ok) {
        throw new Error('Failed to fetch projects');
    }
    
    return await response.json();
    } catch (error) {
        console.error('Error Fetching projects:', error);
        throw error;
    }
};

export const addProject = async (newProject: Project): Promise<Project> => {
    try {
        const response = await fetch(`${API_URL}/AddProject`, {
            method: 'POST',
            headers: {
                "content-type": 'application/json',
            },
            body: JSON.stringify(newProject)
        });

        if (!response.ok) {
            throw new Error ('Failed to add project')
        }

        return await response.json();
    } catch (error) {
        console.error('Error adding project', error);
        throw error;
    }
};

export const updateProject = async (projectId: number, updatedProject: Project) : Promise<Project> => {
    try {
        const response = await fetch(`${API_URL}/UpdateProject/${projectId}`, {
            method: 'PUT',
            headers: {
                "content-type": 'application/json',
            },
            body: JSON.stringify(updatedProject)
        });

        return await response.json();

    } catch (error) {
        console.error('Error updating project:', error);
        throw error;
    }
}

export const deleteProject = async (projectId: number): Promise<void> => {
    try {
        const response = await fetch(`${API_URL}/DeleteProject/${projectId}`,
            {
                method: 'DELETE'
            }
        );

        if (!response.ok) {
            throw new Error('Failed to delete product')
        }
    } catch (error) {
        console.error('Error deleting project', error);
    }
};