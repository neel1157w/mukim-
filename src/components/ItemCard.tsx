import Link from "next/link";
import Image from "next/image";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import type { Item } from "@/lib/types";
import { Tag } from "lucide-react";

type ItemCardProps = {
  item: Item;
};

export default function ItemCard({ item }: ItemCardProps) {
  return (
    <Card className="flex flex-col h-full overflow-hidden transition-all duration-300 hover:shadow-lg hover:-translate-y-1">
      <CardHeader className="p-0">
        <Link href={`/item/${item.id}`} className="block">
          <Image
            src={item.images[0]}
            alt={item.name}
            width={400}
            height={500}
            className="w-full h-64 object-cover"
            data-ai-hint={`${item.category} ${item.name}`}
          />
        </Link>
      </CardHeader>
      <CardContent className="p-4 flex-grow">
        <Badge variant="secondary" className="mb-2">{item.category}</Badge>
        <CardTitle className="text-lg font-semibold leading-tight mb-2">
          <Link href={`/item/${item.id}`} className="hover:text-primary transition-colors">
            {item.name}
          </Link>
        </CardTitle>
        <p className="text-sm text-muted-foreground">{item.condition}</p>
      </CardContent>
      <CardFooter className="p-4 pt-0 flex justify-between items-center">
        <div className="flex items-center gap-1 font-bold text-primary">
            <Tag className="h-4 w-4" />
            <span>{item.points} pts</span>
        </div>
        <Button asChild size="sm" variant="outline">
          <Link href={`/item/${item.id}`}>View</Link>
        </Button>
      </CardFooter>
    </Card>
  );
}
