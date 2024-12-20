import axios from "axios";
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { toast } from "react-toastify";

const getAppointment = async (setAppointments, _id) => {
  const authToken = localStorage.getItem("token");
  console.log(authToken);
  try {
    await axios
      .get(
        `http://localhost:7000/appointment/getsingleappointment/?_id=${_id}`,
        {
          headers: { Authorization: `Bearer ${authToken}` },
        }
      )
      .then((res) => {
        console.log(res.data);
        toast.success(res.data.Message);
        toast.error(res.data.Error);
        setAppointments(res.data.appointments);
      })
      .catch((err) => {
        toast.error(err.response.data.Message);
      });
  } catch (error) {
    console.log(error.message);
  }
};

const ViewClientModal = () => {
  const [client, setClient] = useState([]);
  const [files, setFiles] = useState([]);
  const { _id } = useParams();

  const handleChange = (e) => {
    const { name, value, type, files } = e.target;

    setFiles((prevData) => ({
      ...prevData,
      [name]: type === "file" ? files[0] : value,
      ...(type === "file" && { fileOriginalName: files[0]?.name || "" }),
    }));
  };

  const handleUploadDocuments = async (e) => {
    const authToken = localStorage.getItem("token");
    e.preventDefault();
    console.log(files);

    let uploadData = new FormData();
    Object.keys(files).forEach((key) => {
      uploadData.append(key, files[key]);
    });
    try {
      await axios
        .put(
          `http://localhost:7000/appointment/updatefile/?_id=${_id}`,
          uploadData,
          {
            headers: {
              "Content-Type": "multipart/form-data",
              Authorization: `Bearer ${authToken}`,
            },
          }
        )
        .then((res) => {
          console.log(res.data);
          toast.success(res.data.Message);
          toast.error(res.data.Error);
        })
        .catch((err) => {
          toast.error(err.response.data.Message);
        });
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getAppointment(setClient, _id);
  }, []);

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white dark:bg-gray-800 p-8 rounded-lg shadow-lg w-full max-w-4xl">
        <h2 className="text-3xl font-bold text-gray-800 dark:text-gray-200 mb-6">
          Personal Info
        </h2>
        <div className="grid grid-cols-1 gap-4 mb-6">
          <p className="text-xl">
            <strong>Name:</strong> {client.name}
          </p>
          <p className="text-xl">
            <strong>Email:</strong> {client.email}
          </p>
          <p className="text-xl">
            <strong>Phone:</strong> {client.number}
          </p>
        </div>

        <h2 className="text-2xl font-semibold text-gray-800 dark:text-gray-200 mt-6 mb-4">
          Associated Cases
        </h2>
        <div className="overflow-auto">
          <table className="table-auto w-full border border-gray-200 rounded-lg">
            <thead className="bg-gray-100 dark:bg-gray-700">
              <tr>
                <th className="px-4 py-2 text-left text-xl">Case ID</th>
                <th className="px-4 py-2 text-left text-xl">Title</th>
                <th className="px-4 py-2 text-left text-xl">Status</th>
              </tr>
            </thead>
            <tbody>
              {client ? (
                <tr className="border-t">
                  <td className="px-4 py-2 text-lg">1</td>
                  <td className="px-4 py-2 text-lg">{client.title}</td>
                  <td className="px-4 py-2 text-lg">
                    {client.status === "Ongoing" ? "Ongoing" : client.status}
                  </td>
                </tr>
              ) : (
                <tr>
                  <td colSpan="3" className="px-4 py-2 text-center text-lg">
                    No associated cases.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        <h2 className="text-2xl font-semibold text-gray-800 dark:text-gray-200 mt-6 mb-4">
          Uploaded Documents
        </h2>
        <form onSubmit={handleUploadDocuments} className="mb-6 flex space-x-4">
          <input
            type="file"
            multiple
            name="image"
            onChange={handleChange}
            className="flex-1 px-4 py-2 border rounded-lg text-gray-800 bg-gray-100 focus:outline-none"
          />
          <button
            type="submit"
            className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 text-lg"
          >
            Upload
          </button>
        </form>
        <ul className="list-disc pl-8">
          {client.fileOriginalName ? (
            <li className="text-xl">{client.fileOriginalName}</li>
          ) : (
            <li className="text-xl">No documents uploaded.</li>
          )}
        </ul>

        <div className="text-right mt-8">
          <Link to={"/clients"}>
            <button className="px-6 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600 text-lg">
              Close
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ViewClientModal;
