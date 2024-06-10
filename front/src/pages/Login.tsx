import FormTemplate from '../components/FormTemplate';

function Login() {
  return (
    <div className="flex justify-center items-center h-screen">
      <FormTemplate method="login" route="/base/token/" />
    </div>
  );
}

export default Login;
