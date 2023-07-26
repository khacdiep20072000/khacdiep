import CustomInput from "components/CustomInput/CustomInput";
import React from "react";

const ForgotPassword = () => {
  return (
    <div className="py-4" style={{ background: "var(--color-ffd333)" }}>
      <div className="my-5 w-25 bg-white rounded-3 mx-auto p-3">
        <h3 className="text-center title">Forgot Password</h3>
        <p className="text-center">
          Please Enter your register email to get reset password mail.
        </p>
        <form action="">
          <CustomInput type="text" label="Email Address" id="email" />

          <button
            type="submit"
            className="mt-3 border-0 px-3 py-2 text-white fw-bold w-100 text-center text-decoration-none fs-5"
            style={{ background: "var(--color-ffd333)" }}
          >
            Send Link
          </button>
        </form>
      </div>
    </div>
  );
};

export default ForgotPassword;
