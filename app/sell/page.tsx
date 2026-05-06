import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { SelectCategory } from "../components/SelectCategory";
import { Textarea } from "@/components/ui/textarea";
import TipTapEditor from "../components/Editor";
import { UploadDropzone } from "@/lib/uploadthing";
import { Button } from "@/components/ui/button";

export default function SellRoute() {
    return (
        <section className="w-full max-w-7xl mx-auto px-4 md:px-8">
            <Card>
                <form>
                    <CardHeader>
                        <CardTitle>Sell your product with ease</CardTitle>
                        <CardDescription>Fill out the form below to list your product for sale.</CardDescription>
                    </CardHeader>
                    <CardContent className="flex flex-col gap-y-10 mt-5">
                        <div className="flex flex-col gap-y-2">
                            <Label>Name</Label>
                            <Input type="text" placeholder="Enter product name" />
                        </div>
                        <div className="flex flex-col gap-y-2">
                            <Label>Category</Label>
                            <SelectCategory />
                        </div>
                        <div className="flex flex-col gap-y-2">
                            <Label>Price</Label>
                            <Input type="number" placeholder="Enter product price" />
                        </div>
                        <div className="flex flex-col gap-y-2">
                            <Label>Short Description</Label>
                            <Textarea placeholder="Enter product description" />
                        </div>
                        <div className="flex flex-col gap-y-2">
                            <Label>Detailed Description</Label>
                            <TipTapEditor />
                        </div>
                        <div className="flex flex-col gap-y-2">
                            <Label>Product Images</Label>
                            <UploadDropzone 
                                endpoint="imageUploader"
                                 appearance={{
                                    container: "mt-0 py-6 transition-colors hover:bg-muted/40 hover:border-primary/40",
                                    uploadIcon: "h-6 w-6 text-muted-foreground",
                                    label: "text-sm text-primary hover:text-primary/80 cursor-pointer",
                                    allowedContent: "text-xs text-muted-foreground",
                                }}
                            />
                        </div>
                        <div className="flex flex-col gap-y-2">
                            <Label>Product File</Label>
                            <UploadDropzone 
                                endpoint="productFileUpload"
                                 appearance={{
                                    container: "mt-0 py-6 transition-colors hover:bg-muted/40 hover:border-primary/40",
                                    uploadIcon: "h-6 w-6 text-muted-foreground",
                                    label: "text-sm text-primary hover:text-primary/80 cursor-pointer",
                                    allowedContent: "text-xs text-muted-foreground",
                                }}
                            />
                        </div>
                    </CardContent>
                    <CardFooter>
                        <Button>Submit Form</Button>
                    </CardFooter>
                </form>
            </Card>
        </section>
    )
}