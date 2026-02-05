 import { UseFormReturn } from "react-hook-form";
 import { Input } from "@/components/ui/input";
 import {
   FormControl,
   FormField,
   FormItem,
   FormLabel,
   FormMessage,
 } from "@/components/ui/form";
 import {
   Select,
   SelectContent,
   SelectItem,
   SelectTrigger,
   SelectValue,
 } from "@/components/ui/select";
 import {
   STATUS_OPTIONS,
   DEPARTMENT_OPTIONS,
 } from "@/types/application";
 
 interface CategoryFieldsProps {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  form: UseFormReturn<any>;
   selectedDepartment: string;
 }
 
 export function CategoryFields({ form, selectedDepartment }: CategoryFieldsProps) {
   return (
     <>
       <div className="grid grid-cols-2 gap-4">
         <FormField
           control={form.control}
           name="departmentSelect"
           render={({ field }) => (
             <FormItem>
               <FormLabel>Department</FormLabel>
               <Select onValueChange={field.onChange} value={field.value}>
                 <FormControl>
                   <SelectTrigger>
                     <SelectValue placeholder="Select department" />
                   </SelectTrigger>
                 </FormControl>
                 <SelectContent>
                   {DEPARTMENT_OPTIONS.map((dept) => (
                     <SelectItem key={dept} value={dept}>
                       {dept}
                     </SelectItem>
                   ))}
                 </SelectContent>
               </Select>
               <FormMessage />
             </FormItem>
           )}
         />
         <FormField
           control={form.control}
           name="status"
           render={({ field }) => (
             <FormItem>
               <FormLabel>Status</FormLabel>
               <Select onValueChange={field.onChange} value={field.value}>
                 <FormControl>
                   <SelectTrigger>
                     <SelectValue placeholder="Select status" />
                   </SelectTrigger>
                 </FormControl>
                 <SelectContent>
                   {STATUS_OPTIONS.map((status) => (
                     <SelectItem key={status} value={status}>
                       {status}
                     </SelectItem>
                   ))}
                 </SelectContent>
               </Select>
               <FormMessage />
             </FormItem>
           )}
         />
       </div>
       {selectedDepartment === "Other" && (
         <FormField
           control={form.control}
           name="customDepartment"
           render={({ field }) => (
             <FormItem>
               <FormLabel>Custom Department</FormLabel>
               <FormControl>
                 <Input placeholder="Enter department name" {...field} />
               </FormControl>
               <FormMessage />
             </FormItem>
           )}
         />
       )}
     </>
   );
 }