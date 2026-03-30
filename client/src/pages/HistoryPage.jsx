import { useState, useEffect, useCallback } from "react";
import toast from "react-hot-toast";
import HistoryList from "../components/HistoryList.jsx";
import CodeEditor from "../components/CodeEditor.jsx";
import {
  getHistory,
  deleteHistoryItem,
  clearHistory,
} from "../services/historyService.js";
import "../styles/history.css";

function HistoryPage() {
  const [entries, setEntries] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [selectedEntry, setSelectedEntry] = useState(null);

  const fetchHistory = useCallback(async (page = currentPage) => {
    try {
      setLoading(true);
      const data = await getHistory(page, 8);
      setEntries(data.entries);
      setTotalPages(data.totalPages);
    } catch {
      toast.error("Failed to load history.");
    } finally {
      setLoading(false);
    }
  }, [currentPage]);

  useEffect(() => {
    fetchHistory(currentPage);
  }, [currentPage, fetchHistory]);

  const handleDelete = async (id) => {
    try {
      await deleteHistoryItem(id);
      toast.success("Deleted");
      if (selectedEntry?._id === id) setSelectedEntry(null);
      fetchHistory();
    } catch {
      toast.error("Failed to delete.");
    }
  };

  const handleClearAll = async () => {
    if (!window.confirm("Clear all history? This cannot be undone.")) return;
    try {
      await clearHistory();
      toast.success("History cleared.");
      setEntries([]);
      setSelectedEntry(null);
      setCurrentPage(1);
    } catch {
      toast.error("Failed to clear history.");
    }
  };

  return (
    <div className="history-page">
      {/* Sidebar */}
      <div className="history-sidebar">
        <div className="history-sidebar-header">
          <h2>History</h2>
          {entries.length > 0 && (
            <button className="clear-btn" onClick={handleClearAll}>
              Clear all
            </button>
          )}
        </div>

        <div className="history-list">
          {loading ? (
            <div className="history-empty">Loading...</div>
          ) : (
            <HistoryList
              entries={entries}
              onView={setSelectedEntry}
              onDelete={handleDelete}
              selectedId={selectedEntry?._id}
            />
          )}
        </div>

        {totalPages > 1 && (
          <div className="history-pagination">
            <button
              className="page-btn"
              onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
              disabled={currentPage === 1}
            >
              Prev
            </button>
            {Array.from({ length: totalPages }, (_, i) => i + 1).map((p) => (
              <button
                key={p}
                className={`page-btn ${currentPage === p ? "active" : ""}`}
                onClick={() => setCurrentPage(p)}
              >
                {p}
              </button>
            ))}
            <button
              className="page-btn"
              onClick={() =>
                setCurrentPage((p) => Math.min(totalPages, p + 1))
              }
              disabled={currentPage === totalPages}
            >
              Next
            </button>
          </div>
        )}
      </div>

      {/* Detail Panel */}
      <div className="history-detail">
        {!selectedEntry ? (
          <div className="detail-empty">
            Select an entry to view details
          </div>
        ) : (
          <>
            <div className="detail-header">
              <div className="detail-header-left">
                <span className="detail-type-badge">
                  {selectedEntry.type}
                </span>
                <span className="detail-date">
                  {new Date(selectedEntry.createdAt).toLocaleString()}
                </span>
              </div>
              <button
                className="close-btn"
                onClick={() => setSelectedEntry(null)}
              >
                ×
              </button>
            </div>

            <div className="detail-body">
              {/* Input code */}
              <div className="detail-section">
                <h4>Input · {selectedEntry.sourceLanguage}</h4>
                <div className="detail-editor-wrap">
                  <CodeEditor
                    code={selectedEntry.inputCode}
                    onChange={() => {}}
                    language={selectedEntry.sourceLanguage}
                    readOnly={true}
                  />
                </div>
              </div>

              {/* Output */}
              <div className="detail-section">
                <h4>Output</h4>

                {selectedEntry.type === "translate" && (
                  <div>
                    <span className="detail-lang-badge">
                      Target: {selectedEntry.targetLanguage}
                    </span>
                    <pre className="detail-code-block">
                      {selectedEntry.output?.translatedCode}
                    </pre>
                  </div>
                )}

                {selectedEntry.type === "analyze" && (
                  <div className="detail-complexity-cards">
                    <div className="info-card">
                      <h4>Time Complexity</h4>
                      <div className="badge">
                        {selectedEntry.output?.timeComplexity}
                      </div>
                      <p>{selectedEntry.output?.explanation}</p>
                    </div>
                    <div className="info-card">
                      <h4>Space Complexity</h4>
                      <div className="badge">
                        {selectedEntry.output?.spaceComplexity}
                      </div>
                    </div>
                  </div>
                )}

                {selectedEntry.type === "optimize" && (
                  <div>
                    <pre className="detail-code-block">
                      {selectedEntry.output?.optimizedCode}
                    </pre>
                    {selectedEntry.output?.suggestions && (
                      <div style={{ marginTop: "12px" }}>
                        <p className="detail-explanation">
                          {selectedEntry.output.suggestions}
                        </p>
                      </div>
                    )}
                  </div>
                )}

                {selectedEntry.type === "explain" && (
                  <p className="detail-explanation">
                    {selectedEntry.output?.explanation}
                  </p>
                )}
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
}

export default HistoryPage;
