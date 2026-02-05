 import { UseFormReturn } from "react-hook-form";
 import { format } from "date-fns";
 import { CalendarIcon } from "lucide-react";
 import { Button } from "@/components/ui/button";
 import { Textarea } from "@/components/ui/textarea";
 import { Calendar } from "@/components/ui/calendar";
 import {
   FormControl,
   FormField,
   FormItem,
   FormLabel,
   FormMessage,
 } from "@/components/ui/form";
 import {
   Popover,
   PopoverContent,
   PopoverTrigger,
 } from "@/components/ui/popover";
 import { cn } from "@/lib/utils";
 
 interface DateNotesFieldsProps {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  form: UseFormReturn<any>;
 }
 
 export function DateNotesFields({ form }: DateNotesFieldsProps) {
   return (
     <>
       <FormField
         control={form.control}
         name="dateApplied"
         render={({ field }) => (
           <FormItem className="flex flex-col">
             <FormLabel>Date Applied</FormLabel>
             <Popover>
               <PopoverTrigger asChild>
                 <FormControl>
                   <Button
                     variant="outline"
                     className={cn(
                       "w-full pl-3 text-left font-normal",
                       !field.value && "text-muted-foreground"
                     )}
                   >
                     {field.value ? (
                       format(field.value, "PPP")
                     ) : (
                       <span>Pick a date</span>
                     )}
                     <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                   </Button>
                 </FormControl>
               </PopoverTrigger>
               <PopoverContent className="w-auto p-0" align="start">
                 <Calendar
                   mode="single"
                   selected={field.value}
                   onSelect={field.onChange}
                   disabled={(date) => date > new Date()}
                   initialFocus
                   className="pointer-events-auto"
                 />
               </PopoverContent>
             </Popover>
             <FormMessage />
           </FormItem>
         )}
       />
       <FormField
         control={form.control}
         name="notes"
         render={({ field }) => (
           <FormItem>
             <FormLabel>Notes</FormLabel>
             <FormControl>
               <Textarea
                 placeholder="Add any notes about this application..."
                 className="resize-none"
                 {...field}
               />
             </FormControl>
             <FormMessage />
           </FormItem>
         )}
       />
     </>
   );
 }