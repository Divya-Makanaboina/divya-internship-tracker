 import { UseFormReturn } from "react-hook-form";
 import { Input } from "@/components/ui/input";
 import {
   FormControl,
   FormField,
   FormItem,
   FormLabel,
   FormMessage,
 } from "@/components/ui/form";
 
 interface BasicInfoFieldsProps {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  form: UseFormReturn<any>;
 }
 
 export function BasicInfoFields({ form }: BasicInfoFieldsProps) {
   return (
     <>
       <FormField
         control={form.control}
         name="company"
         render={({ field }) => (
           <FormItem>
             <FormLabel>Company</FormLabel>
             <FormControl>
               <Input placeholder="Company name" {...field} />
             </FormControl>
             <FormMessage />
           </FormItem>
         )}
       />
       <FormField
         control={form.control}
         name="position"
         render={({ field }) => (
           <FormItem>
             <FormLabel>Position</FormLabel>
             <FormControl>
               <Input placeholder="Job position" {...field} />
             </FormControl>
             <FormMessage />
           </FormItem>
         )}
       />
       <FormField
         control={form.control}
         name="location"
         render={({ field }) => (
           <FormItem>
             <FormLabel>Location</FormLabel>
             <FormControl>
               <Input placeholder="e.g., New York, USA or Remote" {...field} />
             </FormControl>
             <FormMessage />
           </FormItem>
         )}
       />
     </>
   );
 }