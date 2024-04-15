import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import TypeIt from "typeit-react";

export const StartTyping = () => {
  return (
    <Card className="flex-1 h-fit">
      <CardHeader>
        <CardTitle>
          <TypeIt
            options={{
              lifeLike: true,
              loop: true,
              speed: 100,
            }}
          >
            Start Typing...
          </TypeIt>
        </CardTitle>
      </CardHeader>

      <CardContent>
        <AspectRatio>
          <img
            src="undraw_wandering_mind.svg"
            alt="Start typing to see typing"
          />
        </AspectRatio>
      </CardContent>
    </Card>
  );
};
