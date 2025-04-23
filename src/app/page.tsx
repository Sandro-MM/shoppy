import Image from "next/image";
import {DialogTrigger} from "@ui/overlays/dialog/dialog-trigger";
import {Button} from "@ui/buttons/button";
import {DialogBody} from "@ui/overlays/dialog/dialog-body";
import {Dialog} from "@ui/overlays/dialog/dialog";

export default function Home() {
  return (
    <div className="bg-bg h-svh">

        <DialogTrigger type={'component'} mobileType={'popover'}>
            <Button variant={'raised'} color={'primary'}>Open</Button>
            <Dialog>
                <DialogBody>
                    213123
                </DialogBody>
            </Dialog>
        </DialogTrigger>

    </div>
  );
}
