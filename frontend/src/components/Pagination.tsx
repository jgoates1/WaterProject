interface PaginationProps {
    currentPage: number;
    totalPages: number;
    pageSize: number;
    onPageChange: (newPage: number) => void;
    onPageSizeChange: (newSize: number) => void;
}

const Pagination = ({currentPage,totalPages,pageSize,onPageChange,onPageSizeChange}: PaginationProps) => {
    return (
        <div className="mt-3 d-flex flex-column align-items-center gap-3">
                <div className="d-flex flex-wrap justify-content-center align-items-center gap-2">
                    <button
                        type="button"
                        className="btn btn-outline-secondary btn-sm"
                        onClick={() => onPageChange(currentPage - 1)}
                        disabled={currentPage <= 1}
                    >
                        Previous
                    </button>
                    {[...Array(totalPages)].map((_, index) => (
                        <button
                            key={index + 1}
                            type="button"
                            className="btn btn-outline-secondary btn-sm"
                            onClick={() => onPageChange(index + 1)}
                            disabled={currentPage === index + 1}
                        >
                            {index + 1}
                        </button>
                    ))}
                    <button
                        type="button"
                        className="btn btn-outline-secondary btn-sm"
                        onClick={() => onPageChange(currentPage + 1)}
                        disabled={currentPage >= totalPages || totalPages === 0}
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
                        onChange={(p) => {onPageSizeChange(Number(p.target.value)); onPageChange(1);}}
                    >
                        <option value="5">5</option>
                        <option value="10">10</option>
                        <option value="20">20</option>
                    </select>
                </label>
            </div>
    );
}

export default Pagination