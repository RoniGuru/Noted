import FormTemplate from '../components/FormTemplate';

function Register() {
  return (
    <div className="flex justify-center items-center h-screen">
      <FormTemplate method="Register" route="/base/user/register/" />
    </div>
  );
}

export default Register;
