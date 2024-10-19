import {Link} from '@tanstack/react-router';
import {FiLock, FiMail} from 'react-icons/fi';
import SyncLoader from 'react-spinners/SyncLoader';

const SignIn: React.FC = () => {
  return (
    <div className="mx-auto mt-10 max-w-md">
      <h2 className="mb-9 text-center text-2xl font-bold text-black dark:text-white sm:text-title-xl2">
        Sign In
      </h2>
      <form>
        {/* Email or Username Input */}
        <div className="mb-6">
          <label className="mb-2.5 block font-medium text-black dark:text-white">
            Email or username
          </label>
          <div className="relative">
            <input
              type="text"
              placeholder="Enter your email or username"
              className="w-full rounded-lg border border-stroke bg-transparent py-4 pl-6 pr-10 text-black outline-none dark:border-form-strokedark dark:bg-form-input dark:text-white"
            />
            <span className="absolute right-4 top-4">
              <FiMail size={22} />
            </span>
          </div>
        </div>

        {/* Password Input */}
        <div className="mb-6">
          <label className="mb-2.5 block font-medium text-black dark:text-white">
            Password
          </label>
          <div className="relative">
            <input
              type="password"
              placeholder="Enter your password"
              className="w-full rounded-lg border border-stroke bg-transparent py-4 pl-6 pr-10 text-black outline-none dark:border-form-strokedark dark:bg-form-input dark:text-white"
            />
            <span className="absolute right-4 top-4">
              <FiLock size={22} />
            </span>
          </div>
        </div>

        {/* Error Message (if any) */}
        <div className="mb-4 text-red-500">
          {/* Example error */}
          {/* <p>Invalid credentials</p> */}
        </div>

        {/* Sign In Button */}
        <div className="mb-5">
          <button
            type="submit"
            className="w-full rounded-lg bg-primary p-4 text-white transition hover:bg-opacity-90"
          >
            Signin
          </button>
        </div>

        {/* Sign Up Link */}
        <div className="mt-6 text-center">
          <p className="text-sm">
            Don’t have an account?{' '}
            <Link className="text-primary" to="/signup">
              Sign Up
            </Link>
          </p>
        </div>
      </form>
    </div>
  );
};

export default SignIn;
