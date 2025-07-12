import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { mockItems, mockUsers } from "@/lib/data";

export default function ManageListingsPage() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Manage Listings</CardTitle>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="hidden w-[100px] sm:table-cell">Image</TableHead>
              <TableHead>Item Name</TableHead>
              <TableHead>User</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {mockItems.map((item) => {
              const user = mockUsers.find((u) => u.id === item.userId);
              return (
                <TableRow key={item.id}>
                  <TableCell className="hidden sm:table-cell">
                    <Image
                      alt={item.name}
                      className="aspect-square rounded-md object-cover"
                      height="64"
                      src={item.images[0]}
                      width="64"
                      data-ai-hint="clothing item"
                    />
                  </TableCell>
                  <TableCell className="font-medium">{item.name}</TableCell>
                  <TableCell>{user?.name || 'Unknown'}</TableCell>
                  <TableCell><Badge variant="secondary">Available</Badge></TableCell>
                  <TableCell>
                    <div className="flex gap-2">
                      <Button variant="outline" size="sm">Approve</Button>
                      <Button variant="destructive" size="sm">Reject</Button>
                    </div>
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}
