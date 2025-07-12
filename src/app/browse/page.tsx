import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Search, Filter } from "lucide-react";
import { mockItems } from "@/lib/data";
import ItemCard from "@/components/ItemCard";
import DashboardLayout from "../dashboard/layout";

export default function BrowsePage() {
  return (
    <DashboardLayout>
    <div className="space-y-12">
      <section className="text-center py-16 md:py-24 bg-accent/30 rounded-lg -mx-4 sm:-mx-6 lg:-mx-8 px-4 sm:px-6 lg:px-8">
        <h1 className="text-4xl md:text-5xl font-bold font-headline text-primary">Give Your Wardrobe a Second Life</h1>
        <p className="mt-4 text-lg md:text-xl max-w-2xl mx-auto text-foreground/80">
          Join our community to swap, style, and embrace sustainable fashion. Discover unique pieces and give your pre-loved clothes a new home.
        </p>
        <div className="mt-8 flex justify-center">
          <Button size="lg" asChild>
            <a href="/register">Start Swapping</a>
          </Button>
        </div>
      </section>

      <section>
        <div className="flex flex-col md:flex-row gap-4 mb-8">
          <div className="relative flex-grow">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
            <Input placeholder="Search for items..." className="pl-10" />
          </div>
          <div className="flex gap-4">
            <Select>
              <SelectTrigger className="w-full md:w-[180px]">
                <Filter className="h-4 w-4 mr-2" />
                <SelectValue placeholder="Category" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="tops">Tops</SelectItem>
                <SelectItem value="bottoms">Bottoms</SelectItem>
                <SelectItem value="dresses">Dresses</SelectItem>
                <SelectItem value="outerwear">Outerwear</SelectItem>
                <SelectItem value="accessories">Accessories</SelectItem>
              </SelectContent>
            </Select>
            <Button variant="secondary">Search</Button>
          </div>
        </div>

        <h2 className="text-3xl font-bold font-headline mb-6">Featured Items</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {mockItems.map((item) => (
            <ItemCard key={item.id} item={item} />
          ))}
        </div>
        <div className="text-center mt-12">
            <Button variant="outline">Load More</Button>
        </div>
      </section>
    </div>
    </DashboardLayout>
  );
}
