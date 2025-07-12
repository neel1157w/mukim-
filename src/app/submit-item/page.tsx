import ItemSubmissionForm from '@/components/ItemSubmissionForm';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

export default function SubmitItemPage() {
  return (
    <div className="py-8 md:py-12">
        <Card className="max-w-3xl mx-auto">
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
  );
}
