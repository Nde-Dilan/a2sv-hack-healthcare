import Image from "next/image";
import Link from "next/link";

import { Button } from "@/components/ui/button";
import { Doctors } from "@/constants";
import { getAppointment } from "@/lib/actions/appointment.actions";
import { formatDateTime } from "@/lib/utils";

const RequestSuccess = async ({
  searchParams,
  params: { userId },
}: SearchParamProps) => {
  const appointmentId = (searchParams?.appointmentId as string) || "";
  const appointment = await getAppointment(appointmentId);

  const doctor = Doctors.find(
    (doctor) => doctor?.name === appointment.primaryPhysician
  );

  return (
    <div className=" flex h-screen max-h-screen px-[5%]">
      <div className="success-img">
        <Link href="/">
          <Image
            src="/assets/icons/logo-full.svg"
            height={1000}
            width={1000}
            alt="logo"
            className="h-10 w-fit"
          />
        </Link>

        <section className="flex flex-col items-center">
          <Image
            unoptimized
            src="/assets/gifs/success.gif"
            height={300}
            width={280}
            alt="success"
          />
          <h2 className="header mb-6 max-w-[600px] text-center">
            Your <span className="text-green-500">new record</span> has
            been successfully added!
          </h2>
          <p>You can check it out <Link href={`/patients/${userId}/record`}>here</Link>.</p>
        </section>

         

        <div className="flex justify-center px-[5%] ">
          <Button variant="outline" className="shad-primary-btn mx-3" asChild>
            <Link href={`/patients/${userId}/new-record`}>
             Add New Record
            </Link>
          </Button>
          {`
          
          `}
          <Button variant="outline" className="shad-primary-btn" asChild>
            <Link href={`/my-app/${userId}`}>My Appointments</Link>
          </Button>
        </div>

        <p className="copyright">© 2024 CarePluse</p>
      </div>
    </div>
  );
};

export default RequestSuccess;
