import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { mockUsers, mockItems, mockSwaps } from "@/lib/data";
import { Shirt, Award, HeartHandshake, ArrowUpRight, PlusCircle } from "lucide-react";
import Image from "next/image";

export default function DashboardOverview() {
    const user = mockUsers[0];
    const userItems = mockItems.filter(item => item.userId === user.id);
    const userSwaps = mockSwaps.filter(swap => swap.ownerId === user.id || swap.requesterId === user.id);

    return (
        <div className="space-y-8">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                <div>
                    <h1 className="text-3xl font-bold font-headline">Welcome back, {user.name}!</h1>
                    <p className="text-muted-foreground">Here&apos;s a snapshot of your swapping activity.</p>
                </div>
                 <Button asChild>
                    <Link href="/submit-item"><PlusCircle className="mr-2 h-4 w-4"/> List a New Item</Link>
                </Button>
            </div>
            
            <div className="grid gap-4 md:grid-cols-3">
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Points Balance</CardTitle>
                        <Award className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">{user.points} pts</div>
                        <p className="text-xs text-muted-foreground">+50 points from last swap</p>
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Items Listed</CardTitle>
                        <Shirt className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">{userItems.length}</div>
                        <p className="text-xs text-muted-foreground">Active on the platform</p>
                    </CardContent>
                </Card>
                 <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Total Swaps</CardTitle>
                        <HeartHandshake className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">{userSwaps.length}</div>
                        <p className="text-xs text-muted-foreground">{userSwaps.filter(s => s.status === 'accepted').length} successful swaps</p>
                    </CardContent>
                </Card>
            </div>

            <div className="grid gap-8 md:grid-cols-2">
                <Card>
                    <CardHeader>
                        <CardTitle>Recent Activity</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <ul className="space-y-4">
                            {userSwaps.slice(0, 3).map(swap => {
                                const item = mockItems.find(i => i.id === swap.itemId);
                                const otherUser = mockUsers.find(u => u.id === (swap.requesterId === user.id ? swap.ownerId : swap.requesterId));
                                return (
                                <li key={swap.id} className="flex items-center gap-4">
                                    <Image src={item?.images[0] || ''} alt={item?.name || ''} width={40} height={40} className="rounded-md object-cover h-10 w-10" data-ai-hint="clothing item"/>
                                    <div className="flex-grow">
                                        <p className="text-sm font-medium">
                                            {swap.requesterId === user.id ? 'You requested ' : `${otherUser?.name} requested `} 
                                            <Link href={`/item/${item?.id}`} className="font-bold hover:underline">{item?.name}</Link>
                                        </p>
                                        <p className="text-xs text-muted-foreground capitalize">{swap.status}</p>
                                    </div>
                                    <span className="text-xs text-muted-foreground">{swap.createdAt.toLocaleDateString()}</span>
                                </li>
                                )
                            })}
                        </ul>
                    </CardContent>
                </Card>

                 <Card>
                    <CardHeader>
                        <CardTitle>Your Latest Items</CardTitle>
                    </CardHeader>
                    <CardContent>
                         <ul className="space-y-4">
                            {userItems.slice(0, 3).map(item => (
                                <li key={item.id} className="flex items-center gap-4">
                                    <Image src={item.images[0]} alt={item.name} width={40} height={40} className="rounded-md object-cover h-10 w-10" data-ai-hint="clothing item"/>
                                    <div className="flex-grow">
                                        <p className="font-medium">{item.name}</p>
                                        <p className="text-xs text-muted-foreground">{item.points} pts</p>
                                    </div>
                                    <Button variant="ghost" size="sm" asChild>
                                        <Link href={`/item/${item.id}`}>View <ArrowUpRight className="ml-2 h-4 w-4"/></Link>
                                    </Button>
                                </li>
                            ))}
                        </ul>
                    </CardContent>
                </Card>
            </div>

        </div>
    );
}
