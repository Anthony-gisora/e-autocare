// import { useParams } from "react-router-dom";

// const RequestService = () => {
//   const param = useParams();
//   const user = param.id;
//   return <div>{user}</div>;
// };

// export default RequestService;
import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

const RequestService = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [issue, setIssue] = useState("");
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitting(true);
    setTimeout(() => {
      alert(`Service requested for mechanic ID: ${id}\nIssue: ${issue}`);
      setSubmitting(false);
      navigate("/");
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-[#edf2f4] flex items-center justify-center px-4 py-10">
      <div className="w-full max-w-xl bg-white shadow-md rounded-xl p-6 space-y-6">
        <h1 className="text-2xl md:text-3xl font-bold text-[#2b2d42]">
          Request Service from Mechanic #{id}
        </h1>

        <form onSubmit={handleSubmit} className="space-y-4">
          <label className="block text-[#2b2d42] font-medium">
            Describe the issue:
            <textarea
              className="w-full mt-1 p-3 border border-[#8d99ae] rounded-md resize-none focus:outline-none focus:ring-2 focus:ring-[#2b2d42]"
              rows={4}
              value={issue}
              onChange={(e) => setIssue(e.target.value)}
              required
            />
          </label>

          <button
            type="submit"
            disabled={submitting}
            className={`w-full py-3 rounded-md font-semibold text-white transition ${
              submitting
                ? "bg-[#8d99ae] cursor-not-allowed"
                : "bg-[#2b2d42] hover:bg-[#1f2034]"
            }`}
          >
            {submitting ? "Submitting..." : "Submit Request"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default RequestService;
