{
  description = "Dev shell for Toolboxes";

  inputs.nixpkgs.url = "github:NixOS/nixpkgs/nixos-unstable";

  outputs = { self, nixpkgs }: {
    devShells."x86_64-linux".default =
      let
        pkgs = import nixpkgs { system = "x86_64-linux"; };
      in pkgs.mkShell {
        buildInputs = [
          pkgs.nodejs_20
          pkgs.pnpm
        ];
      };
  };
}
