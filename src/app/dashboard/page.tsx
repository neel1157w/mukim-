import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { mockUsers, mockItems, mockSwaps } from "@/lib/data";
import { ArrowUpRight, PlusCircle } from "lucide-react";
import Image from "next/image";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import ItemCard from "@/components/ItemCard";
import { Badge } from "@/components/ui/badge";

export default function DashboardOverview() {
    const user = mockUsers[0];
    const userItems = mockItems.filter(item => item.userId === user.id);
    const completedSwaps = mockSwaps.filter(swap => (swap.ownerId === user.id || swap.requesterId === user.id) && swap.status === 'accepted');
    const purchasedItems = completedSwaps.map(swap => mockItems.find(item => item.id === swap.itemId)).filter(Boolean) as (typeof mockItems[0])[];

    return (
        <div className="space-y-8">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                <h1 className="text-3xl font-bold font-headline">Dashboard</h1>
                 <Button asChild>
                    <Link href="/submit-item"><PlusCircle className="mr-2 h-4 w-4"/> Add New Item</Link>
                </Button>
            </div>
            
            <Card>
                <div className="relative">
                    <Image 
                        src="https://images.unsplash.com/photo-1579546929518-9e396f3cc809?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3NDE5ODJ8MHwxfHNlYXJjaHwxfHxhYnN0cmFjdCUyMGdyYWRpZW50fGVufDB8fHx8MTc1MjMxNTM1OXww&ixlib=rb-4.1.0&q=80&w=1080"
                        alt="Cover photo"
                        width={1200}
                        height={200}
                        className="w-full h-32 object-cover rounded-t-lg"
                        data-ai-hint="abstract gradient"
                    />
                </div>
                <CardContent className="p-6 text-center">
                    <div className="flex justify-center -mt-16">
                         <Avatar className="h-24 w-24 border-4 border-background bg-background">
                            <AvatarImage src={user.avatar} alt={user.name} data-ai-hint="person" className="object-cover" />
                            <AvatarFallback>{user.name.charAt(0)}</AvatarFallback>
                        </Avatar>
                    </div>
                     <h2 className="text-2xl font-bold mt-4">{user.name}</h2>
                     <p className="text-sm text-muted-foreground">alice@example.com</p>

                     <div className="grid grid-cols-3 gap-4 pt-6 text-sm">
                        <div className="space-y-1">
                            <p className="font-semibold text-foreground">{user.points}</p>
                            <p className="text-xs text-muted-foreground">Points</p>
                        </div>
                        <div className="space-y-1">
                             <p className="font-semibold text-foreground">{userItems.length}</p>
                            <p className="text-xs text-muted-foreground">Items Listed</p>
                        </div>
                        <div className="space-y-1">
                           <p className="font-semibold text-foreground">{completedSwaps.length}</p>
                           <p className="text-xs text-muted-foreground">Swaps</p>
                        </div>
                    </div>
                </CardContent>
            </Card>

            <section>
                <h2 className="text-2xl font-bold font-headline mb-4">My Listings</h2>
                 <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                    {userItems.map((item) => (
                        <ItemCard key={item.id} item={item} />
                    ))}
                </div>
                 {userItems.length === 0 && (
                    <p className="text-muted-foreground">You haven't listed any items yet.</p>
                )}
            </section>
            
            <section>
                 <h2 className="text-2xl font-bold font-headline mb-4">My Purchases</h2>
                 <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                    {purchasedItems.map((item) => (
                        <Card key={item.id} className="relative overflow-hidden group">
                           <Link href={`/item/${item.id}`}>
                                <Image
                                    src={item.images[0]}
                                    alt={item.name}
                                    width={400}
                                    height={500}
                                    className="w-full h-64 object-cover"
                                    data-ai-hint={`${item.category} ${item.name}`}
                                />
                                <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
                                    <Badge>Completed</Badge>
                                </div>
                            </Link>
                            <CardContent className="p-4">
                                <p className="font-semibold truncate">{item.name}</p>
                                <p className="text-sm text-muted-foreground">{item.points} pts</p>
                            </CardContent>
                        </Card>
                    ))}
                </div>
                {purchasedItems.length === 0 && (
                    <p className="text-muted-foreground">You haven't completed any swaps yet.</p>
                )}
            </section>

        </div>
    );
}
