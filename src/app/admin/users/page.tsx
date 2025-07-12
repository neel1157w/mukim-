import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { mockUsers } from "@/lib/data";

export default function ManageUsersPage() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Manage Users</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {mockUsers.map((user) => (
          <div key={user.id} className="flex items-center justify-between p-4 border rounded-lg">
            <div className="flex items-center gap-4">
              <Avatar className="h-12 w-12">
                <AvatarImage src={user.avatar} alt={user.name} />
                <AvatarFallback>{user.name.charAt(0)}</AvatarFallback>
              </Avatar>
              <div>
                <p className="font-semibold">{user.name}</p>
                <p className="text-sm text-muted-foreground">{user.location}</p>
              </div>
            </div>
            <div className="flex items-center gap-2">
                <Button variant="outline" size="sm">View Activity</Button>
                <Button variant="destructive" size="sm">Ban</Button>
            </div>
          </div>
        ))}
      </CardContent>
    </Card>
  );
}
