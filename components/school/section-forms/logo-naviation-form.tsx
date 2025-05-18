"use client";

import type React from "react";

import { useState } from "react";
import { Info, Loader2 } from "lucide-react";
import Image from "next/image";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Section } from "@/types/types";
import { UploadButton } from "@/lib/uploadthing";
import { createActivity, updateSection } from "@/actions/site";
import { toast } from "sonner";
import { getFormattedDate } from "@/lib/getFormatedDate";

export default function LogoNavigationForm({ section }: { section: Section }) {
  // Current values from the image
  const [logoText, setLogoText] = useState(section.settings.logoText);
  const [logoImage, setLogoImage] = useState(section.settings.logoImage);

  const [navLinks, setNavLinks] = useState(
    section.settings.navLinks.map((item: any) => item.text) // eslint-disable-line @typescript-eslint/no-explicit-any
  );

  // Preview state
  const [previewLogoText, setPreviewLogoText] = useState(logoText);
  const [previewLogoImage, setPreviewLogoImage] = useState(logoImage);
  const [previewNavLinks, setPreviewNavLinks] = useState([...navLinks]);
  const [loading, setLoading] = useState(false);

  // Handle navigation link text update
  const handleNavLinkChange = (index: number, value: string) => {
    const updatedLinks = [...previewNavLinks];
    updatedLinks[index] = value;
    setPreviewNavLinks(updatedLinks);
  };

  // Save changes
  const saveLogoChanges = async () => {
    setLoading(true);
    setLogoText(previewLogoText);
    setLogoImage(previewLogoImage);
    // console.log(previewLogoImage, previewLogoText);
    const data = {
      settings: {
        ...section.settings,
        logoText: previewLogoText,
        logoImage: previewLogoImage,
      },
    };

    try {
      console.log(data);
      await updateSection(section.id, data);
      setLoading(false);
      toast.success("Logo updated", {
        description: " Logo Image and Logo Text Updated Successfully ",
      });
      const activity = {
        activity: `Logo was Updated Successfully`,
        description: `Admin Updated the Logo Image and Logo Text `,
        time: getFormattedDate(new Date()),
        schoolId: section.schoolId,
      };
      await createActivity(activity);
    } catch (error) {
      setLoading(false);
      toast.error("Logo updated Failed", {
        description: " Logo Image and Logo Text Failed to update ",
      });
      console.log(error);
    }
  };

  const saveNavChanges = async () => {
    setLoading(true);
    setNavLinks([...previewNavLinks]);
    const data = {
      settings: {
        ...section.settings,
        navLinks: [
          {
            id: "nav-1",
            text: previewNavLinks[0],
            url: "#about",
            order: 1,
          },
          {
            id: "nav-2",
            text: previewNavLinks[1],
            url: "#admissions",
            order: 2,
          },
          {
            id: "nav-3",
            text: previewNavLinks[2],
            url: "#gallery",
            order: 3,
          },
          {
            id: "nav-4",
            text: previewNavLinks[3],
            url: "#news",
            order: 4,
          },
          {
            id: "nav-5",
            text: previewNavLinks[4],
            url: "#events",
            order: 5,
          },

          {
            id: "nav-6",
            text: previewNavLinks[5],
            url: "#contact",
            order: 6,
          },
        ],
      },
    };
    console.log(data);
    try {
      console.log(data);
      await updateSection(section.id, data);
      setLoading(false);
      toast.success("Logo Navigation Updated", {
        description: " Logo Navigation Updated Successfully ",
      });
      const activity = {
        activity: `Logo Navigation was Updated Successfully`,
        description: `Admin Updated the Logo Navigation Links`,
        time: getFormattedDate(new Date()),
        schoolId: section.schoolId,
      };
      await createActivity(activity);
    } catch (error) {
      setLoading(false);
      toast.error("Logo updated Failed", {
        description: " Logo Navigation Failed to update ",
      });
      console.log(error);
    }
  };

  return (
    <div className="container mx-auto py-8 space-y-8">
      <Tabs defaultValue="logo" className="w-full">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="logo">Logo Settings</TabsTrigger>
          <TabsTrigger value="navigation">Navigation Settings</TabsTrigger>
        </TabsList>

        {/* Logo Settings Tab */}
        <TabsContent value="logo" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Logo Customization</CardTitle>
              <CardDescription>
                Update your school logo and text
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <Alert>
                <Info className="h-4 w-4" />
                <AlertTitle>Important Note</AlertTitle>
                <AlertDescription>
                  Logo image should be square (1:1 ratio) for best results.
                  Recommended size: 100x100 pixels.
                </AlertDescription>
              </Alert>

              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="logo-image">Logo Image</Label>
                  <div className="flex items-center gap-4">
                    <div className="border rounded-md p-2 w-24 h-24 flex items-center justify-center bg-muted">
                      <Image
                        src={previewLogoImage || "/placeholder.svg"}
                        alt="School Logo"
                        width={80}
                        height={80}
                        className="object-contain"
                      />
                    </div>
                    <div className="flex-1">
                      <UploadButton
                        className="col-span-full"
                        endpoint="logoImage"
                        onClientUploadComplete={(res) => {
                          // Do something with the response
                          console.log("Files: ", res);
                          
                          // logoImage(res[0].url);
                          setPreviewLogoImage(res[0].url);
                        }}
                        onUploadError={(error: Error) => {
                          // Do something with the error.
                          console.log(error);
                          alert(`ERROR! ${error.message}`);
                        }}
                      />
                    </div>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="logo-text">Logo Text</Label>
                  <Input
                    id="logo-text"
                    value={previewLogoText}
                    onChange={(e) => setPreviewLogoText(e.target.value)}
                    placeholder="School Name"
                  />
                </div>
              </div>

              <div className="mt-6">
                <h3 className="text-sm font-medium mb-2">Preview</h3>
                <div className="border rounded-md p-4 flex items-center gap-3">
                  <Image
                    src={previewLogoImage || "/placeholder.svg"}
                    alt="School Logo"
                    width={40}
                    height={40}
                    className="object-contain"
                  />
                  <span className="font-bold text-lg">{previewLogoText}</span>
                </div>
              </div>
            </CardContent>
            <CardFooter className="flex justify-between">
              <Button
                variant="outline"
                onClick={() => {
                  setPreviewLogoText(logoText);
                  setPreviewLogoImage(logoImage);
                }}
              >
                Reset
              </Button>
              {loading ? (
                <Button disabled>
                  <Loader2 className="animate-spin" />
                  Saving Please wait...
                </Button>
              ) : (
                <Button onClick={saveLogoChanges}>Save Changes</Button>
              )}
            </CardFooter>
          </Card>
        </TabsContent>

        {/* Navigation Settings Tab */}
        <TabsContent value="navigation" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Navigation Customization</CardTitle>
              <CardDescription>
                Update your website navigation links
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <Alert>
                <Info className="h-4 w-4" />
                <AlertTitle>Important Note</AlertTitle>
                <AlertDescription>
                  You can only update the text for existing navigation links.
                  Adding or removing links is not supported.
                </AlertDescription>
              </Alert>

              <div className="space-y-4">
                {previewNavLinks.map((link, index) => (
                  <div key={index} className="space-y-2">
                    <Label htmlFor={`nav-link-${index}`}>
                      Navigation Link {index + 1}
                    </Label>
                    <Input
                      id={`nav-link-${index}`}
                      value={link}
                      onChange={(e) =>
                        handleNavLinkChange(index, e.target.value)
                      }
                      placeholder={`Navigation Link ${index + 1}`}
                    />
                  </div>
                ))}
              </div>

              <div className="mt-6">
                <h3 className="text-sm font-medium mb-2">Preview</h3>
                <div className="border rounded-md p-4">
                  <div className="flex flex-wrap gap-4 justify-end">
                    {previewNavLinks.map((link, index) => (
                      <span key={index} className="text-sm font-medium">
                        {link}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </CardContent>
            <CardFooter className="flex justify-between">
              <Button
                variant="outline"
                onClick={() => setPreviewNavLinks([...navLinks])}
              >
                Reset
              </Button>

              {loading ? (
                <Button disabled>
                  <Loader2 className="animate-spin" />
                  Saving Please wait...
                </Button>
              ) : (
                <Button onClick={saveNavChanges}>Save Changes</Button>
              )}
            </CardFooter>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
