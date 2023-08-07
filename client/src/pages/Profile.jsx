import React, { useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";

const validationSchema = Yup.object().shape({
  name: Yup.string().required("Name is required"),
  email: Yup.string().email("Invalid email").required("Email is required"),
  role: Yup.string().required("Role is required"),
});

function Profile({ currentUser, isLoggedIn }) {
  const [students, setStudents] = useState([]);
  const handleSubmit = async (values, { setSubmitting }) => {
    try {
      const response = await fetch(`/api/user/${currentUser.id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(values),
      });

      if (!response.ok) {
        throw new Error("Failed to update user data.");
      }

      // Handle success, e.g., show a success message to the user.
      console.log("User data updated successfully.");
      window.location.reload();
    } catch (error) {
      // Handle errors, e.g., show an error message to the user.
      console.error("Error updating user data:", error.message);
    } finally {
      setSubmitting(false);
    }
  };

  function handleDeleteUser(id) {
    fetch(`/api/user/${id}`, {
      method: "DELETE",
    })
      .then((response) => {
        if (response.ok) {
          // If the response is successful, remove the user from the local state
          setStudents((students) => students.filter((stu) => stu.id !== id));
          console.log("User deleted successfully.");
        } else {
          console.error("Failed to delete user.");
        }
      })
      .catch((error) => {
        console.error("Error deleting user:", error.message);
      });
  }

  return (
    <Formik
      initialValues={{
        name: currentUser.name,
        email: currentUser.email,
      }}
      validationSchema={validationSchema}
      onSubmit={handleSubmit}
    >
      {({ isSubmitting }) => (
        <Form>
          <div className="pl-24 pt-8 font-ibarra">
            <label htmlFor="name">Name: </label>
            <Field type="text" id="name" name="name" />
          </div>

          <div className="pl-24 pt-8">
            <label htmlFor="email">Email: </label>
            <Field type="email" id="email" name="email" />
            <ErrorMessage name="email" component="div" className="error" />
          </div>

          <div className="pl-24 pt-8">
            <button className="border-2 " type="submit" disabled={isSubmitting}>
              Save Your Edits
            </button>
          </div>
          <div className="pl-24 pt-8">
            <button
              className="border-2 border-black rounded-md bg-red-600 font-bold text-white"
              onClick={() => handleDeleteUser(currentUser.id)}
              type="button"
            >
              Delete User
            </button>
          </div>
        </Form>
      )}
    </Formik>
  );
}

export default Profile;
