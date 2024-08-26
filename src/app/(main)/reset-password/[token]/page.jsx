import ResetPasswordForm from "@/Components/ResetPasswordForm/ResetPasswordForm";



const page = ({params}) => {
  return <div>  <ResetPasswordForm token={params.token}/></div>;
};

export default page;