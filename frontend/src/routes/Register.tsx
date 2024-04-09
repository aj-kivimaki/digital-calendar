// styles
import './Register.css';

const Register: React.FC = () => {
  return (
    <div className="register">
      <h2>Create Your Account Here</h2>
      <div className="register__group">
        <label htmlFor="">Name:</label>
        <input type="text" placeholder="Type Your Name Here!" required />
      </div>
      <div className="register__group">
        <label htmlFor="">Email:</label>
        <input type="text" placeholder="Enter Your Email Address!" required />
      </div>
      <div className="register__group">
        <label htmlFor="">Password:</label>
        <input type="password" placeholder="Set Your Password" required />
      </div>
      <div className="register__group">
        <label htmlFor="">Confirm Password:</label>
        <input type="password" placeholder="Confirm Your Passwowrd" required />
      </div>
      <button className="register__btn">Register</button>
      <p>
        Already Have An Account? <button className="login__btn">Login</button>
      </p>
    </div>
  );
};

export default Register;
