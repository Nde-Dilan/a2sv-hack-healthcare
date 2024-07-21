import Image from "next/image";
import Link from "next/link";

import { AppointmentForm } from "@/components/forms/AppointmentForm";
import { Button } from "@/components/ui/button";
import { getPatient } from "@/lib/actions/patient.actions";

const Appointment = async ({ params: { userId } }: SearchParamProps) => {
  const patient = await getPatient(userId);

  return (
    <div className="flex h-screen max-h-screen">
      <section className="remove-scrollbar container my-auto">
        <div className="sub-container max-w-[860px] flex-1 justify-between">
          <div className="flex justify-between">
            <Image
              src="/assets/icons/logo-full.svg"
              height={1000}
              width={1000}
              alt="logo"
              className="mb-12 h-10 w-fit"
            />
            <div className="flex justify-center">
              <Button variant="outline" className="shad-primary-btn" asChild>
                    <Link
                      target="_blank"
                      href="https://carepulse-ai.vercel.app/"
                      rel="noopener noreferrer"
                    >
                      {/* <IconMessage /> */}
                      Chat with AI
                    </Link>
                  </Button>
                  <Button variant="outline" className="shad-primary-btn" asChild>
              <Link href={`/my-app/${userId}`} >
                My Appointments
              </Link>
                        </Button>
            </div>
          </div>

          <AppointmentForm
            patientId={patient?.$id}
            userId={userId}
            type="create"
          />

          <p className="copyright mt-10 py-12">© 2024 CarePluse</p>
        </div>
      </section>

      <Image
        src="/assets/images/appointment-img.png"
        height={1500}
        width={1500}
        alt="appointment"
        className="side-img max-w-[390px] bg-bottom"
      />
    </div>
  );
};

export default Appointment;
