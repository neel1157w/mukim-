import Link from "next/link";
import Image from "next/image";
import { mockItems, mockUsers, mockSwaps } from "@/lib/data";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Check, X } from "lucide-react";
import { Badge } from "@/components/ui/badge";

export default function SwapsPage() {
    const currentUser = mockUsers[0];
    const incomingSwaps = mockSwaps.filter(swap => swap.ownerId === currentUser.id);
    const outgoingSwaps = mockSwaps.filter(swap => swap.requesterId === currentUser.id);

    const SwapRequestCard = ({ swap, type }: { swap: (typeof mockSwaps)[0], type: 'incoming' | 'outgoing' }) => {
        const item = mockItems.find(i => i.id === swap.itemId);
        const otherUser = mockUsers.find(u => u.id === (type === 'incoming' ? swap.requesterId : swap.ownerId));
        if (!item || !otherUser) return null;

        return (
            <div className="flex items-center justify-between gap-4 p-4 border rounded-lg">
                <div className="flex items-center gap-4">
                     <Image
                        alt={item.name}
                        className="aspect-square rounded-md object-cover h-16 w-16"
                        src={item.images[0]}
                        data-ai-hint="clothing item"
                    />
                    <div>
                        <Link href={`/item/${item.id}`} className="font-semibold hover:underline">{item.name}</Link>
                        <div className="flex items-center gap-2 mt-1 text-sm text-muted-foreground">
                            <Avatar className="h-6 w-6">
                                <AvatarImage src={otherUser.avatar} alt={otherUser.name} data-ai-hint="person" />
                                <AvatarFallback>{otherUser.name.charAt(0)}</AvatarFallback>
                            </Avatar>
                            <span>{type === 'incoming' ? `Request from ${otherUser.name}` : `Request to ${otherUser.name}`}</span>
                        </div>
                    </div>
                </div>
                <div className="flex items-center gap-2">
                    {swap.status === 'pending' && type === 'incoming' && (
                        <>
                        <Button size="icon" variant="outline" className="h-8 w-8 text-green-600 hover:text-green-600 hover:bg-green-50"><Check className="h-4 w-4"/></Button>
                        <Button size="icon" variant="outline" className="h-8 w-8 text-red-600 hover:text-red-600 hover:bg-red-50"><X className="h-4 w-4"/></Button>
                        </>
                    )}
                     {swap.status !== 'pending' && (
                        <Badge variant={swap.status === 'accepted' ? 'default' : 'destructive'} className={`${swap.status === 'accepted' ? "bg-green-600" : ""}`}>{swap.status}</Badge>
                    )}
                </div>
            </div>
        );
    };

    return (
        <div className="space-y-8">
            <div>
                <h1 className="text-3xl font-bold font-headline">Swaps</h1>
                <p className="text-muted-foreground">Manage your swap requests.</p>
            </div>
            
            <Tabs defaultValue="incoming">
                <TabsList className="grid w-full grid-cols-2">
                    <TabsTrigger value="incoming">Incoming Requests</TabsTrigger>
                    <TabsTrigger value="outgoing">Outgoing Requests</TabsTrigger>
                </TabsList>
                <TabsContent value="incoming">
                    <Card>
                        <CardHeader>
                            <CardTitle>Incoming Requests</CardTitle>
                            <CardDescription>Respond to swap requests for your items.</CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            {incomingSwaps.length > 0 ? incomingSwaps.map(swap => (
                                <SwapRequestCard key={swap.id} swap={swap} type="incoming" />
                            )) : <p className="text-muted-foreground text-center py-8">No incoming requests yet.</p>}
                        </CardContent>
                    </Card>
                </TabsContent>
                <TabsContent value="outgoing">
                     <Card>
                        <CardHeader>
                            <CardTitle>Outgoing Requests</CardTitle>
                            <CardDescription>Track the status of your swap requests.</CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-4">
                             {outgoingSwaps.length > 0 ? outgoingSwaps.map(swap => (
                                <SwapRequestCard key={swap.id} swap={swap} type="outgoing" />
                            )) : <p className="text-muted-foreground text-center py-8">You haven&apos;t made any requests yet.</p>}
                        </CardContent>
                    </Card>
                </TabsContent>
            </Tabs>
        </div>
    );
}
