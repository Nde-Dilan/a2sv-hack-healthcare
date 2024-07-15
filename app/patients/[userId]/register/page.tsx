import Image from "next/image";
import { redirect } from "next/navigation";

import { Button } from "@/components/ui/button";
import RegisterForm from "@/components/forms/RegisterForm";
import { getPatient, getUser } from "@/lib/actions/patient.actions";

const Register = async ({ params: { userId } }: SearchParamProps) => {
  const user = await getUser(userId);
  const patient = await getPatient(userId);

  if (patient) redirect(`/patients/${userId}/new-appointment`);

  return (
    <div className="flex h-screen max-h-screen">
      <section className="remove-scrollbar container">
        <div className="sub-container max-w-[860px] flex-1 flex-col py-10">
        <div className="relative">
  <div className="flex">
    <Image
      src="/assets/icons/logo-full.svg"
      height={1000}
      width={1000}
      alt="patient"
      className="mb-12 h-10 w-fit"
    />
  </div>
  <div className="absolute top-0 right-0 m-4">
    <Button asChild size="sm" variant="ghost" className="bg-green-500 ">
      <a
        target="_blank"
        href="https://carepulse-ai.vercel.app/"
        rel="noopener noreferrer"
      >
        {/* <IconMessage /> */}
        <span className="rounded-lg gap-1 md:flex">Chat with AI</span>
      </a>
    </Button>
  </div>
</div>


          <RegisterForm user={user} />

          <p className="copyright py-12">© 2024 CarePluse</p>
        </div>
      </section>

      <Image
        src="/assets/images/register-img.png"
        height={1000}
        width={1000}
        alt="patient"
        className="side-img max-w-[390px]"
      />
    </div>
  );
};

export default Register;
