from __future__ import absolute_import
# Copyright (c) 2010-2015 openpyxl

from openpyxl.descriptors import (
    String,
    Set,
    NoneSet,
    Alias,
    Sequence,
)
from openpyxl.descriptors.serialisable import Serialisable

from openpyxl.xml.constants import REL_NS, PKG_REL_NS
from openpyxl.xml.functions import Element, SubElement, tostring


class Relationship(Serialisable):
    """Represents many kinds of relationships."""
    # TODO: Use this object for workbook relationships as well as
    # worksheet relationships

    tagname = "Relationship"

    Type = String()
    type = Alias('Type')
    Target = String()
    target = Alias('Target')
    TargetMode = String(allow_none=True)
    targetMode = Alias('TargetMode')
    Id = String(allow_none=True)
    id = Alias('Id')


    def __init__(self, type, target=None, targetMode=None, id=None):
        self.type = "%s/%s" % (REL_NS, type)
        self.target = target
        self.targetMode = targetMode
        self.id = id


class RelationshipList(Serialisable):

    tagname = "Relationships"

    Relationship = Sequence(expected_type=Relationship)


    def __init__(self, Relationship=()):
        self.Relationship = Relationship


    def append(self, value):
        values = self.Relationship[:]
        values.append(value)
        self.Relationship = values


    def __len__(self):
        return len(self.Relationship)


    def __bool__(self):
        return bool(self.Relationship)


    def to_tree(self):
        tree = Element("Relationships", xmlns=PKG_REL_NS)
        for idx, rel in enumerate(self.Relationship, 1):
            if not rel.id:
                rel.id = "rId{0}".format(idx)
            tree.append(rel.to_tree())

        return tree
