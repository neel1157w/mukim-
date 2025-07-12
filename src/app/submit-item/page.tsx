import ItemSubmissionForm from '@/components/ItemSubmissionForm';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { mockItems } from '@/lib/data';
import ItemCard from '@/components/ItemCard';

export default function SubmitItemPage() {
  const userItems = mockItems.filter(item => item.userId === 'user1').slice(0, 3);
  return (
    <div className="py-8 md:py-12 grid lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
            <Card>
                <CardHeader>
                    <CardTitle className="text-2xl md:text-3xl font-headline">List an Item for Swap</CardTitle>
                    <CardDescription>
                        Provide details about your item. Clear photos and accurate descriptions help you swap faster!
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <ItemSubmissionForm />
                </CardContent>
            </Card>
        </div>
        <div className="space-y-6">
            <h2 className="text-xl font-bold font-headline">Previous Listings</h2>
            <div className="space-y-4">
                {userItems.map(item => (
                    <Card key={item.id} className="overflow-hidden">
                       <ItemCard item={item} />
                    </Card>
                ))}
            </div>
        </div>
    </div>
  );
}
