"use client";

import { useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/hooks/use-toast";
import { suggestItemTags } from "@/app/actions";
import { Wand2, X, Loader2 } from "lucide-react";
import Image from "next/image";

const formSchema = z.object({
  name: z.string().min(3, "Item name must be at least 3 characters long."),
  description: z.string().min(10, "Description must be at least 10 characters long."),
  category: z.string().min(1, "Please select a category."),
  condition: z.string().min(1, "Please select the item's condition."),
  size: z.string().min(1, "Please specify the size."),
  image: z.any().refine((files) => files?.length === 1, "Image is required."),
});

type FormValues = z.infer<typeof formSchema>;

export default function ItemSubmissionForm() {
  const [tags, setTags] = useState<string[]>([]);
  const [tagInput, setTagInput] = useState("");
  const [photoDataUri, setPhotoDataUri] = useState<string | null>(null);
  const [isSuggesting, setIsSuggesting] = useState(false);
  const { toast } = useToast();

  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors },
  } = useForm<FormValues>({
    resolver: zodResolver(formSchema),
  });

  const description = watch("description");
  const imageFile = watch("image");

  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPhotoDataUri(reader.result as string);
        setValue("image", event.target.files);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSuggestTags = async () => {
    if (!photoDataUri || !description) {
      toast({
        variant: "destructive",
        title: "Missing Information",
        description: "Please provide a description and upload an image to suggest tags.",
      });
      return;
    }
    setIsSuggesting(true);
    try {
      const result = await suggestItemTags({ photoDataUri, description });
      if (result.error) {
        throw new Error(result.error);
      }
      if (result.tags) {
        setTags((prev) => [...new Set([...prev, ...result.tags!])]);
        toast({ title: "Tags suggested!", description: "AI has suggested some tags for your item." });
      }
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : "An unknown error occurred";
      toast({ variant: "destructive", title: "Suggestion Failed", description: errorMessage });
    } finally {
      setIsSuggesting(false);
    }
  };

  const addTag = () => {
    if (tagInput && !tags.includes(tagInput)) {
      setTags([...tags, tagInput]);
      setTagInput("");
    }
  };

  const removeTag = (tagToRemove: string) => {
    setTags(tags.filter((tag) => tag !== tagToRemove));
  };

  const onSubmit: SubmitHandler<FormValues> = (data) => {
    console.log({ ...data, tags });
    toast({
      title: "Item Listed!",
      description: `${data.name} has been successfully listed for swapping.`,
    });
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      <div className="space-y-2">
        <Label htmlFor="name">Item Name</Label>
        <Input id="name" {...register("name")} />
        {errors.name && <p className="text-sm text-destructive">{errors.name.message}</p>}
      </div>

      <div className="space-y-2">
        <Label htmlFor="description">Description</Label>
        <Textarea id="description" {...register("description")} />
        {errors.description && <p className="text-sm text-destructive">{errors.description.message}</p>}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="space-y-2">
          <Label>Category</Label>
          <Select onValueChange={(value) => setValue("category", value)}>
            <SelectTrigger><SelectValue placeholder="Select category..." /></SelectTrigger>
            <SelectContent>
                <SelectItem value="Tops">Tops</SelectItem>
                <SelectItem value="Bottoms">Bottoms</SelectItem>
                <SelectItem value="Dresses">Dresses</SelectItem>
                <SelectItem value="Outerwear">Outerwear</SelectItem>
                <SelectItem value="Accessories">Accessories</SelectItem>
                <SelectItem value="Shoes">Shoes</SelectItem>
            </SelectContent>
          </Select>
          {errors.category && <p className="text-sm text-destructive">{errors.category.message}</p>}
        </div>
        <div className="space-y-2">
          <Label>Condition</Label>
          <Select onValueChange={(value) => setValue("condition", value)}>
            <SelectTrigger><SelectValue placeholder="Select condition..." /></SelectTrigger>
            <SelectContent>
                <SelectItem value="New with tags">New with tags</SelectItem>
                <SelectItem value="Excellent">Excellent</SelectItem>
                <SelectItem value="Good">Good</SelectItem>
                <SelectItem value="Fair">Fair</SelectItem>
            </SelectContent>
          </Select>
          {errors.condition && <p className="text-sm text-destructive">{errors.condition.message}</p>}
        </div>
        <div className="space-y-2">
          <Label htmlFor="size">Size</Label>
          <Input id="size" {...register("size")} placeholder="e.g., M, UK 10, 42" />
          {errors.size && <p className="text-sm text-destructive">{errors.size.message}</p>}
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="image">Image</Label>
        <Input id="image" type="file" accept="image/*" onChange={handleImageChange} />
        {errors.image && <p className="text-sm text-destructive">{errors.image.message as string}</p>}
        {photoDataUri && (
          <div className="mt-4 relative w-32 h-32">
            <Image src={photoDataUri} alt="Preview" layout="fill" objectFit="cover" className="rounded-md" />
          </div>
        )}
      </div>

      <div className="space-y-4">
        <div className="flex items-end gap-2">
            <div className="flex-grow space-y-2">
                <Label htmlFor="tags">Tags</Label>
                <Input id="tags" value={tagInput} onChange={(e) => setTagInput(e.target.value)} placeholder="Add relevant tags" />
            </div>
            <Button type="button" variant="outline" onClick={addTag}>Add Tag</Button>
        </div>

        <div className="flex items-center gap-4">
            <Button type="button" variant="outline" onClick={handleSuggestTags} disabled={isSuggesting}>
            {isSuggesting ? (
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            ) : (
                <Wand2 className="mr-2 h-4 w-4" />
            )}
            Suggest Tags with AI
            </Button>
        </div>

        <div className="flex flex-wrap gap-2">
          {tags.map((tag) => (
            <Badge key={tag} variant="secondary">
              {tag}
              <button type="button" onClick={() => removeTag(tag)} className="ml-1.5 rounded-full hover:bg-destructive/20 p-0.5">
                <X className="h-3 w-3" />
              </button>
            </Badge>
          ))}
        </div>
      </div>

      <Button type="submit" size="lg" className="w-full">List My Item</Button>
    </form>
  );
}
