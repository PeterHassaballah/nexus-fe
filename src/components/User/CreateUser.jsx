import React,{useRef} from "react";
import * as Yup from 'yup';
import { Formik, Form, Field } from "formik";
import { formSchema } from "./formValidation";
import { useDispatch } from "react-redux";
import { createUser } from "../../features/userDetailSlice";
import { useNavigate } from "react-router-dom";

const CreateUser = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const initialValues = {
    name: "",
    email: "",
    age: "",
    file:null
  };
  
  const fileInputRef = useRef(null);
  const handleFileChange = (event, setFieldValue) => {
    setFieldValue('file', event.currentTarget.files[0]);
  };
  const validationSchema = Yup.object().shape({
    file: Yup.mixed().required('File is required'),
  });
  const onSubmit = (values) => {
    dispatch(createUser(values));
    navigate("/");
  };
  const handleSubmit = async (values, actions) => {
    try {
      const formData = new FormData();
      formData.append('file', values.file);

      // Send the form data to your API endpoint
      const response = dispatch(createUserJson(values));
      console.log('File uploaded successfully:', response.data);

      // Reset the form after successful submission
      actions.resetForm();
    } catch (error) {
      console.error('Error uploading file:', error);
    }
  };
  return (
    <div className="flex">
      <div className="flex flex-col justify-center items-center h-[85vh] w-1/2">
        <div className="p-3 text-3xl m-3 mb-4">Create User</div>
        <Formik
          initialValues={initialValues}
          validationSchema={formSchema}
          onSubmit={onSubmit}
        >
          {({ errors, touched }) => (
            <Form className="flex flex-col p-5 justify-center max-w-md mx-auto">
              <div className="flex flex-col mb-4">
                <label htmlFor="name" className="text-lg p-3">
                  Name
                </label>
                <Field
                  type="text"
                  name="name"
                  className="w-full p-2 outline outline-1 sm:w-72 lg:w-80 xl:w-96"
                />
                <div className="text-red-700 ml-2">
                  {errors.name && touched.name && <p>{errors.name}</p>}
                </div>
              </div>

              <div className="flex flex-col mb-4">
                <label htmlFor="email" className="text-lg p-3">
                  Email
                </label>
                <Field
                  type="email"
                  name="email"
                  className="w-full p-2 outline outline-1 sm:w-72 lg:w-80 xl:w-96"
                />
                <div className="text-red-700 ml-2">
                  {errors.email && touched.email && <p>{errors.email}</p>}
                </div>
              </div>

              <div className="flex flex-col mb-4">
                <label htmlFor="age" className="text-lg p-3">
                  Age
                </label>
                <Field
                  type="text"
                  name="age"
                  className="w-full p-2 outline outline-1 sm:w-72 lg:w-80 xl:w-96"
                />
                <div className="text-red-700 ml-2">
                  {errors.age && touched.age && <p>{errors.age}</p>}
                </div>
              </div>

              <div className="flex justify-center">
                <div className="p-5">
                  <button
                    type="submit"
                    className="p-2 outline outline-1 rounded-xl m-2 hover:bg-[#050505] hover:text-white"
                  >
                    Create
                  </button>
                </div>
              </div>
            </Form>
          )}
        </Formik>
      </div>
      <div className="mt-8 justify-center items-center h-[85vh] w-2/5">
        <h2 className="p-3 text-3xl mb-4"> Or Upload file</h2>
        <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
          onSubmit={handleSubmit}
        >
          {({ isSubmitting, setFieldValue }) => (
            <Form>
              <div><div
                style={{
                  border: '2px dashed #ccc',
                  padding: '20px',
                  textAlign: 'center',
                  marginBottom: '20px',
                }}
                onClick={() => fileInputRef.current.click()}
              >
                <p>Click here or drag and drop a file to upload</p>
                <input
                  type="file"
                  ref={fileInputRef}
                  style={{ display: 'none' }}
                  onChange={(event) => handleFileChange(event, setFieldValue)}
                />
              </div>

              <button className="p-2 outline outline-1 rounded-xl m-2 hover:bg-[#050505] hover:text-white"
              type="submit" disabled={isSubmitting}>
                Upload File
              </button>
              </div>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
};

export default CreateUser;
