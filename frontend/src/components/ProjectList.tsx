import { useEffect, useState } from "react";
import type { Project } from '../types/Project'
import { useNavigate } from "react-router-dom";

function ProjectList({selectedCategories} : {selectedCategories: string[]}) {

    const [projects, setProjects] = useState<Project[]>([]);
    
    const [pageSize, setPageSize] = useState<number>(10);

    const [pageNum, setPageNum] = useState<number>(1);

    const [totalPages, setTotalPages] = useState<number>(0);

    const navigate = useNavigate();


    useEffect(() => {
        const fetchProjects = async () => {
            const categoryParams = selectedCategories.map((cat) => `projectTypes=${encodeURIComponent(cat)}`).join('&');
            const response = await fetch(`https://localhost:5000/water/allprojects?pageSize=${pageSize}&pageNum=${pageNum}${selectedCategories.length ? `&${categoryParams}` : ''}`);
            const data = await response.json()
            setProjects(data.projects);
            setTotalPages(Math.ceil(data.totalNumProjects / pageSize));
        };
        fetchProjects();
    }, [pageSize, pageNum, selectedCategories]);

    return (
        <>
            
            <br/>
            {projects.map((p) => 
                <div id="projectCard" className='card' key={p.projectId}>
                    <h3 className="card-title">{p.projectName}</h3>
                    <div className="card-body">
                    <ul className="list-unstyled">
                        <li><strong>Project Type: </strong>{p.projectType}</li>
                        <li><strong>Regional Program: </strong>{p.projectRegionalProgram}</li>
                        <li><strong>Impact: </strong>{p.projectImpact} Individuals Served</li>
                        <li><strong>Project Phase: </strong>{p.projectPhase}</li>
                        <li><strong>Project Status: </strong>{p.projectFunctionalityStatus}</li>
                    </ul>

                    <button className="btn btn-success" onClick={() => navigate(`/donate/${p.projectName}/${p.projectId}`)}>Donate</button>
                    </div>
                </div>)}

            <div className="mt-3 d-flex flex-column align-items-center gap-3">
                <div className="d-flex flex-wrap justify-content-center align-items-center gap-2">
                    <button
                        type="button"
                        className="btn btn-outline-secondary btn-sm"
                        onClick={() => setPageNum(pageNum - 1)}
                        disabled={pageNum <= 1}
                    >
                        Previous
                    </button>
                    {[...Array(totalPages)].map((_, index) => (
                        <button
                            key={index + 1}
                            type="button"
                            className="btn btn-outline-secondary btn-sm"
                            onClick={() => setPageNum(index + 1)}
                            disabled={pageNum === index + 1}
                        >
                            {index + 1}
                        </button>
                    ))}
                    <button
                        type="button"
                        className="btn btn-outline-secondary btn-sm"
                        onClick={() => setPageNum(pageNum + 1)}
                        disabled={pageNum >= totalPages || totalPages === 0}
                    >
                        Next
                    </button>
                </div>
                <label>
                    Results per page:
                    <select
                        className="form-select form-select-sm d-inline-block ms-2"
                        style={{ width: "auto", verticalAlign: "middle" }}
                        value={pageSize}
                        onChange={(p) => {setPageSize(Number(p.target.value)); setPageNum(1);}}
                    >
                        <option value="5">5</option>
                        <option value="10">10</option>
                        <option value="20">20</option>
                    </select>
                </label>
            </div>
        </>
    );
}

export default ProjectList
