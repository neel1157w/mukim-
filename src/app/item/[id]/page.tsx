import Image from 'next/image';
import { notFound } from 'next/navigation';
import { mockItems, mockUsers } from '@/lib/data';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Separator } from '@/components/ui/separator';
import { Tag, User, MapPin, Calendar, HeartHandshake } from 'lucide-react';
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from '@/components/ui/carousel';

export default function ItemPage({ params }: { params: { id: string } }) {
  const item = mockItems.find((i) => i.id === params.id);

  if (!item) {
    notFound();
  }

  const user = mockUsers.find((u) => u.id === item.userId);

  return (
    <div className="py-8 md:py-12">
      <div className="grid md:grid-cols-2 gap-8 lg:gap-12">
        <div>
           <Carousel className="w-full">
            <CarouselContent>
              {item.images.map((img, index) => (
                <CarouselItem key={index}>
                  <Card className="overflow-hidden">
                    <Image
                      src={img}
                      alt={`${item.name} image ${index + 1}`}
                      width={600}
                      height={800}
                      className="w-full h-auto object-cover aspect-[3/4]"
                      data-ai-hint={`${item.category} ${item.name}`}
                    />
                  </Card>
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious className="left-2" />
            <CarouselNext className="right-2"/>
          </Carousel>
        </div>

        <div className="space-y-6">
          <div className="space-y-2">
            <Badge variant="secondary">{item.category}</Badge>
            <h1 className="text-3xl md:text-4xl font-bold font-headline">{item.name}</h1>
            <div className="flex items-center gap-2 text-2xl font-bold text-primary">
              <Tag className="h-6 w-6" />
              <span>{item.points} pts</span>
            </div>
          </div>

          <p className="text-foreground/80">{item.description}</p>
          
          <Card>
            <CardContent className="p-4 grid grid-cols-2 gap-4 text-sm">
                <div><span className="font-semibold">Size:</span> {item.size}</div>
                <div><span className="font-semibold">Condition:</span> {item.condition}</div>
            </CardContent>
          </Card>
          
          <div className="flex flex-wrap gap-2">
            {item.tags.map((tag) => (
              <Badge key={tag} variant="outline">{tag}</Badge>
            ))}
          </div>

          <Separator />

          {user && (
            <Card>
              <CardHeader className='flex-row items-center gap-4'>
                <Avatar className="h-16 w-16">
                  <AvatarImage src={user.avatar} alt={user.name} data-ai-hint="person" />
                  <AvatarFallback>{user.name.charAt(0)}</AvatarFallback>
                </Avatar>
                <div>
                  <CardTitle>{user.name}</CardTitle>
                  <div className="text-sm text-muted-foreground flex flex-col gap-1 mt-1">
                    <div className="flex items-center gap-2"><MapPin size={14}/> {user.location}</div>
                    <div className="flex items-center gap-2"><Calendar size={14}/> Member since {user.memberSince.getFullYear()}</div>
                  </div>
                </div>
              </CardHeader>
            </Card>
          )}

          <Button size="lg" className="w-full">
            <HeartHandshake className="mr-2 h-5 w-5" />
            Request a Swap
          </Button>
        </div>
      </div>
    </div>
  );
}
