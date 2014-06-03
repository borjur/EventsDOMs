var ELEMENT_NODE = 1; 
var ATTRIBUTE_NODE = 2; 
var TEXT_NODE = 3; 
var CDATA_SECTION_NODE = 4; 
var ENTITY_REFERENCE_NODE = 5;
var ENTITY_NODE = 6;
var PROCESSING_INSTRUCTION_NODE = 7;
var COMMENT_NODE = 8;
var DOCUMENT_NODE = 9;
var DOCUMENT_TYPE_NODE = 10;
var DOCUMENT_FRAGMENT_NODE = 11;
var NOTATION_NODE = 12;

/*
	Function Name: AttachEvent
	Arguments: OBJ,EVT,FNCT
	Action: cross browser: attaches event to passed in object.  FNCT will be the event's callback function.
	Returns: true on success
*/

function AttachEvent(OBJ,EVT,FNCT)
{
	if (OBJ.addEventListener)
	{
		OBJ.addEventListener(EVT,FNCT,false);
		return true;
	} 
	else if (OBJ.attachEvent) 
	{
		return OBJ.attachEvent("on"+EVT,FNCT);
	}
}

/*
	Function Name: RemoveTextNodes
	Arguments: NODE
	Action: Removes all child "empty" text nodes from an element. Allows for recursive removal.
	Returns: nothing
	Notes: The purpose of this function it to equalize the Mozilla and IE DOMs.
*/ 
function RemoveTextNodes(NODE,RECURSIVE)
{
	var ChildNode;
	for (var i=NODE.childNodes.length-1; i>=0; i--)
	{
		ChildNode = NODE.childNodes[i];
		if (ChildNode.nodeType == TEXT_NODE && !(/\S/.test(ChildNode.nodeValue)))
		{
			NODE.removeChild(ChildNode);
		}
		else if (RECURSIVE && ChildNode.hasChildNodes())
		{
			RemoveTextNodes(ChildNode,true);
		}
	}
}