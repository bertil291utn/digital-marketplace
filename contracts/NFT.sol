// contracts/NFT.sol
// SPDX-License-Identifier: MIT OR Apache-2.0
pragma solidity 0.8.16;

import "@openzeppelin/contracts/utils/Counters.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import {Base64} from "./libraries/Base64.sol";

import "hardhat/console.sol";

contract NFT is ERC721URIStorage {
    using Counters for Counters.Counter;
    Counters.Counter private _tokenIds;
    address contractAddress;
    mapping(address => string) private records;

    string svgPartOne =
        '<svg width="350" height="350" viewBox="0 0 350 350" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M0 0h350v350H0V0Z" fill="url(#a)"/><path d="M103.491 103.98c-6.487 2.162-8.65-8.65-8.65-8.65s2.952-2.96.72-5.594c3.48-3.478 1.446-5.221 1.446-5.221-5.976-5.973-15.657-5.973-21.627 0a12.794 12.794 0 0 0-1.691 2.074c-.187.263-.352.532-.52.801l-.043.083a15.234 15.234 0 0 0-1.85 4.615c-.478.976-1.16 2.016-2.383 3.242-4.325 4.325-15.137-2.162-23.79 6.488-.089.088-.138.211-.211.318-.288.257-.59.483-.869.764-10.151 10.152-9.185 27.583 2.166 38.93 10.778 10.782 27.038 12.17 37.342 3.579.177-.095.358-.187.505-.334.217-.22.385-.428.59-.642.162-.15.333-.285.492-.437 5.179-5.182 7.164-11.409 6.38-17.774-.207-3.028-.504-5.401 1.194-7.099 2.162-2.162 8.649 0 12.974-4.325 6.475-6.49 1.93-12.182-2.175-10.818Z" fill="#BB1A34"/><path d="m82.568 98.936 46.915-46.912 6.488 6.49-46.916 46.916-6.487-6.494Z" fill="#292F33"/><path d="M67.317 130.207c5.45 3.906 5.992 10.623 5.686 14.532-.128 1.615 1.588 2.746 2.995 1.948 7.839-4.453 14.075-11.589 12.35-24.019-.34-2.248.34-6.475 6.95-7.359 6.609-.887 8.995-3.361 9.811-4.542.468-.676.887-2.545-.954-2.612-1.838-.067-6.405 1.364-10.494-3.475-4.09-4.838-4.768-6.814-4.906-7.564-.137-.749-4.31-11.298-7.723-5.7-2.835 4.651-5.989 13.79-16.17 16.17-4.145.967-9.387 3.074-10.901 5.995-2.545 4.906 1.407 8.335 4.814 10.653 3.41 2.315 8.542 5.973 8.542 5.973Z" fill="#F5F8FA"/><path d="m76.71 100.472 4.325-4.328 10.815 10.812-4.324 4.325-10.816-10.809Zm-13.687 13.684 4.328-4.325 10.812 10.812-4.325 4.325-10.815-10.812Z" fill="#292F33"/><path d="m59.35 124.258 66.683-66.56 1.621 1.623-66.68 66.562-1.624-1.625Zm2.658 2.655 66.683-66.558 1.621 1.624-66.68 66.565-1.624-1.631Z" fill="#CCD6DD"/><path d="M66.749 127.733a3.066 3.066 0 0 1 0 4.325 3.066 3.066 0 0 1-4.325 0l-6.49-6.487a3.066 3.066 0 0 1 0-4.325h.002a3.066 3.066 0 0 1 4.325 0l6.488 6.487Zm9.827 6.824a3.06 3.06 0 1 0-.001-6.118 3.06 3.06 0 0 0 0 6.118Zm4.334 4.052a2.098 2.098 0 1 1-4.196.002 2.098 2.098 0 0 1 4.196-.002Z" fill="#292F33"/><path d="M144.048 54.984a3.273 3.273 0 0 1-.003 4.619l-13.341 9.237a3.277 3.277 0 0 1-4.619 0l-6.927-6.931a3.273 3.273 0 0 1 .003-4.618l9.237-13.339a3.276 3.276 0 0 1 4.618 0l11.032 11.032Z" fill="#BB1A34"/><path d="M134.98 71.767a1.912 1.912 0 1 0-.001-3.823 1.912 1.912 0 0 0 .001 3.823Zm3.847-2.585a1.912 1.912 0 1 0 0-3.823 1.912 1.912 0 0 0 0 3.823Zm3.851-2.584a1.912 1.912 0 1 0 0-3.824 1.912 1.912 0 0 0 0 3.824ZM118.43 54.666a1.912 1.912 0 1 0-.001-3.823 1.912 1.912 0 0 0 .001 3.823Zm2.578-3.792a1.912 1.912 0 1 0 0-3.824 1.912 1.912 0 0 0 0 3.824Zm2.578-3.79a1.912 1.912 0 1 0 0-3.824 1.912 1.912 0 0 0 0 3.824Z" fill="#66757F"/><defs><linearGradient id="a" x1="0" y1="0" x2="350" y2="350" gradientUnits="userSpaceOnUse"><stop stop-color="#CB5EEE"/><stop offset=".698" stop-color="#D87D79" stop-opacity=".995"/><stop offset="1" stop-color="#E49B0C" stop-opacity=".99"/></linearGradient></defs><text fill="#fff" xml:space="preserve" style="white-space:pre" font-family="Plus Jakarta Sans,DejaVu Sans,Noto Color Emoji,Apple Color Emoji,sans-serif" font-size="27" font-weight="bold" letter-spacing="0em"><tspan x="43" y="283.229">';
    string svgPartTwo = "</tspan></text></svg>";

    constructor(address marketplaceAddress) ERC721("Distro Fank IP", "DFIP") {
        contractAddress = marketplaceAddress;
    }

    function createToken(string calldata _bandName) public returns (uint) {
        _tokenIds.increment();
        uint256 newItemId = _tokenIds.current();

        string memory finalSvg = string(
            abi.encodePacked(svgPartOne, _bandName, svgPartTwo)
        );

        string memory json = Base64.encode(
            bytes(
                string(
                    abi.encodePacked(
                        '{"name": "',
                        _bandName,
                        '", "description": "Distro Fank IP is a token generated and stored on chain to check and assess music rights, IP, among others assets ",',
                        '"image": "data:image/svg+xml;base64,',
                        Base64.encode(bytes(finalSvg)),
                        '"',
                        '"}'
                    )
                )
            )
        );

        string memory finalTokenUri = string(
            abi.encodePacked("data:application/json;base64,", json)
        );

        _mint(msg.sender, newItemId);
        _setTokenURI(newItemId, finalTokenUri);
        setApprovalForAll(contractAddress, true);
        return newItemId;
    }

    function setRecord(string calldata record) public {
        require(balanceOf(msg.sender) > 0, "You have to have mint first");
        records[msg.sender] = record;
    }

    function getRecord() public view returns (string memory) {
        return records[msg.sender];
    }
}
