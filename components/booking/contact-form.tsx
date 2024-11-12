import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { PhoneInput } from "@/components/ui/phone-input";
import { format, parseISO, addHours } from "date-fns";

const formSchema = z.object({
  name: z.string().min(2).max(50),
  email: z.string().email(),
  phone: z.string().min(15).max(16),
});

interface ContactFormProps {
  date: Date;
  selectedTime: string | undefined;
  packageDuration: number;
  onSubmit: (data: z.infer<typeof formSchema>) => void;
}

export function ContactForm({
  date,
  selectedTime,
  packageDuration,
  onSubmit,
}: ContactFormProps) {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      phone: "",
    },
  });

  return (
    <div className="grid grid-cols-2 gap-4 max-md:grid-cols-1">
      <div className="grid">
        <div className="space-y-2">
          <div>
            <h3 className="text-sm text-zinc-500 font-normal">Date :</h3>
            <p className="font-medium text-xl">
              {format(date, "EEEE MMMM d, yyyy")}
            </p>
          </div>
          <div>
            <h3 className="text-sm text-zinc-500 font-normal">Time :</h3>
            <p className="font-medium text-xl">
              {selectedTime &&
                `${format(
                  parseISO(`2024-01-01T${selectedTime}`),
                  "h:mm a"
                )} - ${format(
                  addHours(
                    parseISO(`2000-01-01T${selectedTime}`),
                    packageDuration
                  ),
                  "h:mm a"
                )}`}
            </p>
          </div>
        </div>
      </div>
      <div className="grid">
        <Form {...form}>
          <form
            id="contact-form"
            onSubmit={form.handleSubmit(onSubmit)}
            className="space-y-2"
          >
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Username</FormLabel>
                  <FormControl>
                    <Input placeholder="Vinod Jayaweera" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input placeholder="me@gmail.com" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="phone"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Phone</FormLabel>
                  <FormControl>
                    <PhoneInput {...field} defaultCountry="LK" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </form>
        </Form>
      </div>
    </div>
  );
}
