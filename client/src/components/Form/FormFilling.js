import { useNavigate } from "react-router-dom";
import { Form, Formik, Field } from "formik";
import * as Yup from "yup";
import { FaUser } from "react-icons/fa";
import { Spin } from "antd";
import Cookies from "universal-cookie";

let validationSchema = Yup.object({
  username: Yup.string().required("*username field is required"),
});

const FormFilling = () => {
  const initialValues = { username: "" };
  const navigate = useNavigate();
  const cookie = new Cookies();

  const handleSubmit = (data, { resetForm }) => {
    cookie.set("username_task7", data.username);
    resetForm();
    navigate("/");
  };

  return (
    <div className="top-40 relative">
      <>
        <div className="container max-w-screen-sm center mx-auto">
          <Formik
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={handleSubmit}
            enableReinitialize
          >
            {({ errors, touched }) => (
              <Spin spinning={false}>
                <Form className="bg-gray-600 shadow-md rounded px-8 pt-6 pb-8 mb-4">
                  <h1 className="text-xl font-bold leading-tight tracking-tight text-white md:text-2xl mb-4 text-center flex w-100  items-center justify-center">
                    <FaUser /> <span className="ml-4">Sign in </span>
                  </h1>

                  <div className="mb-4">
                    <label
                      className="block text-white text-sm font-bold mb-2"
                      htmlFor="username"
                    >
                      Username
                    </label>
                    <Field
                      className={`shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${
                        touched.username && errors.username && "border-red-700"
                      }`}
                      id="username"
                      name="username"
                      type="text"
                      placeholder="type your username"
                    />
                    {touched.username && errors.username && (
                      <p className="text-red-500 mt-2 text-xs italic">
                        {errors.username}.
                      </p>
                    )}
                  </div>

                  <div className="flex items-center justify-between">
                    <button
                      className="bg-slate-700 hover:bg-slate-800 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                      type="submit"
                    >
                      Sign In
                    </button>
                  </div>
                </Form>
              </Spin>
            )}
          </Formik>
          <p className="text-center text-gray-500 text-xs">
            &copy;2022 Nodirbek Intern. All rights reserved.
          </p>
        </div>
      </>
    </div>
  );
};

export default FormFilling;
