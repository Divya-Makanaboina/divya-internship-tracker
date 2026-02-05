 import { UseFormReturn } from "react-hook-form";
 import { Input } from "@/components/ui/input";
 import {
   FormControl,
   FormField,
   FormItem,
   FormLabel,
   FormMessage,
 } from "@/components/ui/form";
 
 interface PortalFieldsProps {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  form: UseFormReturn<any>;
 }
 
 export function PortalFields({ form }: PortalFieldsProps) {
   return (
     <>
       <FormField
         control={form.control}
         name="portalLink"
         render={({ field }) => (
           <FormItem>
             <FormLabel>Application Portal Link</FormLabel>
             <FormControl>
               <Input placeholder="https://careers.company.com/apply" type="url" {...field} />
             </FormControl>
             <FormMessage />
           </FormItem>
         )}
       />
       <div className="grid grid-cols-2 gap-4">
         <FormField
           control={form.control}
           name="portalUsername"
           render={({ field }) => (
             <FormItem>
               <FormLabel>Portal Username</FormLabel>
               <FormControl>
                 <Input placeholder="Username or email" {...field} />
               </FormControl>
               <FormMessage />
             </FormItem>
           )}
         />
         <FormField
           control={form.control}
           name="portalPassword"
           render={({ field }) => (
             <FormItem>
               <FormLabel>Portal Password</FormLabel>
               <FormControl>
                 <Input placeholder="Password" type="password" {...field} />
               </FormControl>
               <FormMessage />
             </FormItem>
           )}
         />
       </div>
     </>
   );
 }