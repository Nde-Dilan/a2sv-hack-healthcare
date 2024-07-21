import Image from "next/image";
import Link from "next/link";

import { StatCard } from "@/components/StatCard";
import { columns } from "@/components/table/columns";
import { DataTable } from "@/components/table/DataTable";
import { getRecentAppointmentListForUser } from "@/lib/actions/appointment.actions";
// import { getPatientAppointmentList } from "@/lib/actions/appointment.actions";

const PatientPage = async ({ params: { userId } }: SearchParamProps) => {
  console.log(userId);
  
    const appointments = await getRecentAppointmentListForUser(userId);

  return (
    <div className="mx-auto flex max-w-7xl flex-col space-y-14">
      <header className="admin-header">
        <Link href="/" className="cursor-pointer">
          <Image
            src="/assets/icons/logo-full.svg"
            height={32}
            width={162}
            alt="logo"
            className="h-8 w-fit"
          />
        </Link>

        <p className="text-16-semibold">Patient Dashboard</p>
      </header>

      <main className="admin-main">
        <section className="w-full space-y-4">
          <h1 className="header">Welcome 👋</h1>
          <p className="text-dark-700">
            Here are your past, current, and upcoming appointments
          </p>
        </section>

        <section className="admin-stat">
          <StatCard
            type="past"
            count={appointments?.pastCount}
            label="Past appointments"
            icon={"/assets/icons/cancelled.svg"}          />
          <StatCard
            type="current"
            count={appointments.currentCount}
            label="Current appointments"
            icon={"/assets/icons/appointments.svg"}
          />
          <StatCard
            type="upcoming"
            count={appointments.upcomingCount}
            label="Upcoming appointments"
            icon={"/assets/icons/pending.svg"}          />
        </section>

        <DataTable columns={columns} data={appointments.documents} />
      </main>
    </div>
  );
};

export default PatientPage;
