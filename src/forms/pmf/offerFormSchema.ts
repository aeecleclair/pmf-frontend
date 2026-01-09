import z from "zod";
import { describe } from "zod/v4/core";


export default function offerFormSchema(
    t: (arg: keyof Messages["curriculumFormSchema"]) => string,
) {
    return z.object({
        company_name: z.string(),
        title: z.string(),
        description: z.string,
        offer_type: z.enum(["TFE", 'APP', 'EXE', 'CDI', 'CDD']),
        location: z.string(),
        location_type: z.enum(['On_site', 'Hybrid', 'Remote']),
        start_date: z.date(),
        end_date: z.date(),
        duration: z.number()
    })
}