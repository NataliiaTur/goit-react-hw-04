const ErrorMessage = ({ message }) => {
  return (
    <div style={{ textAlign: "center", marginTop: "20px", color: "red" }}>
      <p>{message}</p>
    </div>
  );
};

export default ErrorMessage;
