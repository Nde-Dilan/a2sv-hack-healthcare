"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { Form, FormControl } from "@/components/ui/form";
import { SelectItem } from "@/components/ui/select";
import {
  Doctors,
  PatientFormDefaultValues,
} from "@/constants";
import { registerRecord } from "@/lib/actions/record.actions";
import { UploadRecordValidation } from "@/lib/validation";

import "react-datepicker/dist/react-datepicker.css";
import "react-phone-number-input/style.css";
import CustomFormField, { FormFieldType } from "../CustomFormField";
import { FileUploader } from "../FileUploader";
import SubmitButton from "../SubmitButton";
import { Button } from "../ui/button";

const UploadRecord = ({ user }: { user: User }) => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  const form = useForm<z.infer<typeof UploadRecordValidation>>({
    resolver: zodResolver(UploadRecordValidation),
    defaultValues: {
      ...PatientFormDefaultValues,
      name: "New record 101",
    },
  });

  const onSubmit = async (values: z.infer<typeof UploadRecordValidation>) => {
    setIsLoading(true);
  
    let formData;
    if (values.recordDocument && values.recordDocument.length > 0) {
      const blobFile = new Blob([values.recordDocument[0]], {
        type: values.recordDocument[0].type,
      });
  
      formData = new FormData();
      formData.append("blobFile", blobFile);
      formData.append("fileName", values.recordDocument[0]?.name);
    }
  
    try {
      const userId = user?.$id;
      
      if (!userId) {
        throw new Error("User ID not found");
      }
  
      const record = {
        userId,
        name: values.name,
        birthDate: new Date(values.birthDate),
        primaryPhysician: values.primaryPhysician,
        recordDocument: formData,
        notes: values.notes,
      };
  
      const newRecord = await registerRecord(record);
  
      if (newRecord) {
        // Redirect to a record details page or a success page
        // router.push(`/records/${newRecord.$id}`);

        console.log("Record created successfully:", newRecord);
        
      }
    } catch (error) {
      console.error("Error submitting record:", error);
      // Handle error (e.g., show error message to user)
    }
  
    setIsLoading(false);
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="flex-1 space-y-12"
      >
        <section className="space-y-4">
          <h1 className="header">Upload a new record 📜</h1>
          <p className="text-dark-700">Let us handle all the tracaseries for you!</p>
        </section>

        <section className="space-y-6">
          <div className="mb-9 space-y-1">
            <h2 className="sub-header">Basic Record Information</h2>
          </div>

          {/* NAME */}

          <CustomFormField
            fieldType={FormFieldType.INPUT}
            control={form.control}
            name="name"
            placeholder="Nde Dilan"
            iconSrc="/assets/icons/user.svg"
            label="Name (give it a name)"
            iconAlt="user"
          />
 
          {/* BirthDate & Gender */}
          <div className="flex flex-col gap-6 xl:flex-row">
            <CustomFormField
              fieldType={FormFieldType.DATE_PICKER}
              control={form.control}
              name="birthDate"
              label="Date of delivrance"
            />

             
          </div>

          
        </section>

        <section className="space-y-6">
          <div className="mb-9 space-y-1">
            <h2 className="sub-header">Medical Information</h2>
          </div>

          {/* PRIMARY CARE PHYSICIAN */}
          <CustomFormField
            fieldType={FormFieldType.SELECT}
            control={form.control}
            name="primaryPhysician"
            label="Who was the doctor in charge of you?"
            placeholder="Select a physician"
          >
            {Doctors.map((doctor, i) => (
              <SelectItem key={doctor?.name + i} value={doctor?.name}>
                <div className="flex cursor-pointer items-center gap-2">
                  <Image
                    src={doctor.image}
                    width={32}
                    height={32}
                    alt="doctor"
                    className="rounded-full border border-dark-500"
                  />
                  <p>{doctor?.name}</p>
                </div>
              </SelectItem>
            ))}
          </CustomFormField>
        </section>

        <section className="space-y-6">
          <div className="mb-9 space-y-1">
            <h2 className="sub-header">Document and Other notes</h2>
          </div>

           

          <CustomFormField
            fieldType={FormFieldType.SKELETON}
            control={form.control}
            name="recordDocument"
            label="Scanned Copy of Record Document"
            renderSkeleton={(field) => (
              <FormControl>
                <FileUploader files={field.value} onChange={field.onChange} />
              </FormControl>
            )}
          />
           <CustomFormField
              fieldType={FormFieldType.TEXTAREA}
              control={form.control}
              name="notes"
              label="Notes you would like to add (optional)"
              placeholder="Appendectomy in 2015, Asthma diagnosis in childhood"
            />
        </section>

    
            <div className="flex justify-between gap-6">
              <Button variant="destructive"
              className="w-1/2">
                Cancel
              </Button>
                      <SubmitButton
                      className={ "shad-primary-btn w-1/2"} isLoading={isLoading}>Submit and Continue</SubmitButton>
            </div>
      </form>
    </Form>
  );
};

export default UploadRecord;
