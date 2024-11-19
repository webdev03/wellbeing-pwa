{ pkgs ? import <nixpkgs> {} }:

pkgs.mkShell {
  buildInputs = [
    pkgs.bun
    # We use Bun, but this thing has a reliance on some parts of Node
    pkgs.nodejs_22
  ];
}
