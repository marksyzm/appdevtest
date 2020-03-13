# appdevtest

To run use `npm i`, run the server in a separate terminal with `npm run start.api`, add the platforms with `cordova platform add <platform>` and finally run `cordova run <platform>` with name of platform replaced with `browser`, `ios`, or `android`.

## Main Component Source

Look in `www/js/appdevtest/src/components/app-root/app-root.tsx` for the main web component that operates the infinite scrolling, API etc.

## Improvements

I would do the work to make sure the component takes an array of any other element and thus allows for an outside source to use it. The infinite scroll tool uses stencil by ionic as the web component library (like svelte etc). I would also like to run over the data being shown/hidden to be sure it is displaying what it should from top to bottom with any extra time given. The API should have its own service handler or redux end point, and the directory structure is not how I would like it. I also typically use Ionic to handle dev environment tooling and recently have been experimenting using capacitor components. There's more I can think of but I don't want to overdo this 😂

Test environment is also ready to go with `npm test` (none are added just yet).